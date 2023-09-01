import { useLayoutEffect } from 'react'
import create from 'zustand'
import createContext from 'zustand/context'
import { devtools, persist } from 'zustand/middleware'
import { pickCart } from '@/lib'
import { dset } from 'dset'
import { klona } from 'klona'

let store

const getDefaultInitialState = () => ({
  '@@cart': [],
  '@@checkout': {
    customer: {
      customerName: '',
      customerLastName: '',
      customerPhone: '',
      customerEmail: '',
    },
    shippingAddress: {
      firstName: '',
      lastName: '',
      phone: '',
      address1: '',
      address2: '',
      numExt: '',
      colony: '',
      state: '',
      city: '',
      province: '',
      postalCode: '',
    },
    methodPayment: {
      type: 'card',
    },
    shippingMethod: {
      provider: null,
      serviceLevelCode: null,
    },
    steps: {
      customer: {
        active: true,
        completed: false,
      },
      shippingAddress: {
        active: false,
        completed: false,
      },
      shippingMethod: {
        active: false,
        completed: false,
      },
      methodPayment: {
        active: false,
        completed: false,
      },
    },
    clientSecret: null,
    orderReference: 'xxxxxx',
  },
  '@@outStock': {
    show: false,
    products: [],
  },
})

const zustandContext = createContext()

export const Provider = zustandContext.Provider
// An example of how to get types
/** @type {import('zustand/index').UseStore<typeof initialState>} */
export const useStore = zustandContext.useStore

export const initializeStore = (preloadedState = {}) => {
  return create(
    devtools(
      persist((set, get) => ({
        ...getDefaultInitialState(),
        ...preloadedState,
        tick: (lastUpdate, light) => {
          set({
            lastUpdate,
            light: !!light,
          })
        },
        addProductToCart: (product, quantity = 1) => {
          let actualCart = klona(get())
          const indexCart = actualCart['@@cart'].findIndex(
            (p) => p.id === product.id
          )
          if (indexCart !== -1) {
            let qty = actualCart['@@cart'][indexCart].quantity
            if (quantity >= 1) {
              qty = actualCart['@@cart'][indexCart].quantity + quantity
            }
            dset(actualCart, `@@cart.${indexCart}.quantity`, qty)
            set(
              { ['@@cart']: actualCart['@@cart'] },
              false,
              'cart/addItemToCart'
            )
          } else {
            set(
              {
                ['@@cart']: [
                  ...actualCart['@@cart'],
                  { ...pickCart(product), quantity },
                ],
              },
              false,
              'cart/addFirstItemToCart'
            )
          }
        },
        deleteItemCart: (id) => {
          let actualCart = klona(get())
          const filterCart = actualCart['@@cart'].filter(
            (item) => id !== item.id
          )
          set({ ['@@cart']: filterCart }, false, 'cart/deteleItem')
        },
        updateCartItems: async (cartList = [], mutate) => {
          let actualCart = klona(get())
          if (Array.isArray(cartList)) {
            cartList.forEach((item) => {
              const indexItem = actualCart['@@cart'].findIndex(
                (p) => p.id === item.id
              )
              console.log(
                `indexItem: ${indexItem} cantidad: ${item.quantity}, ID:${item.id}`
              )
              if (indexItem !== -1) {
                dset(actualCart, `@@cart.${indexItem}.quantity`, item.quantity)
              }
            })
          }
          await set(
            { ['@@cart']: actualCart['@@cart'] },
            false,
            'cart/updateItems'
          )
          await mutate('api/summary')
        },
        addOutStockItems: (data, visible) =>
          set({ '@@outStock': { products: data, show: visible } }),
        /**
         * CHECKOUT ACTIONS
         */
        toggleStepCheckout: (step) => {
          let actualCart = klona(get())
          dset(
            actualCart,
            `@@checkout.steps.${step}.active`,
            !actualCart['@@checkout'].steps[step].active
          )
          set(
            { ['@@checkout']: actualCart['@@checkout'] },
            false,
            'checkout/toggleStep'
          )
        },
        setStepCheckout: (currentStep, nextStep, data) => {
          let cloneState = klona(get())
          dset(cloneState, `@@checkout.${currentStep}`, data)
          dset(cloneState, `@@checkout.steps.${currentStep}.completed`, true)
          dset(cloneState, `@@checkout.steps.${nextStep}.active`, true)
          set(
            { ['@@checkout']: cloneState['@@checkout'] },
            false,
            'checkout/setCustomer'
          )
        },
        setClientSecret: (clientSecret, orderReference) => {
          let cloneState = klona(get())
          set(
            {
              ['@@checkout']: {
                ...cloneState['@@checkout'],
                clientSecret,
                orderReference,
              },
            },
            false,
            'checkout/setClientSecret'
          )
        },
        emptyCheckoutAndCart: () => {
          set({ ...getDefaultInitialState() }, false, 'checkout/empty')
        },
      }))
    )
  )
}

export function useCreateStore(serverInitialState) {
  // Server side code: For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(serverInitialState)
  }
  // End of server side code

  // Client side code:
  // Next.js always re-uses same store regardless of whether page is a SSR or SSG or CSR type.
  const isReusingStore = Boolean(store)
  store = store ?? initializeStore(serverInitialState)
  // When next.js re-renders _app while re-using an older store, then replace current state with
  // the new state (in the next render cycle).
  // (Why next render cycle? Because react cannot re-render while a render is already in progress.
  // i.e. we cannot do a setState() as that will initiate a re-render)
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment (i.e. client or server)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    // serverInitialState is undefined for CSR pages. It is up to you if you want to reset
    // states on CSR page navigation or not. I have chosen not to, but if you choose to,
    // then add `serverInitialState = getDefaultInitialState()` here.
    if (serverInitialState && isReusingStore) {
      store.setState(
        {
          // re-use functions from existing store
          ...store.getState(),
          // but reset all other properties.
          ...serverInitialState,
        },
        true // replace states, rather than shallow merging
      )
    }
  })

  return () => store
}
