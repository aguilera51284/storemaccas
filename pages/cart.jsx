import { useState } from 'preact/hooks'
import Layout from '@/components/layout'
import Qty from '@/components/qty'
import { useStore } from '@/store'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import currency from 'currency.js'
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { isSSR } from '@/lib'
import OutStock from '@/components/outStock'
import useSWR, { useSWRConfig } from 'swr'
import http from '@/lib/http'
import { serializeCartList } from '@/lib'
import { getStrapiMedia } from '@/lib/strapi'

const CartPage = () => {
  const { mutate } = useSWRConfig()
  const [cartListUpdate, setCartList] = useState([])
  const cartList = useStore((state) => state['@@cart'])
  const outStock = useStore((state) => state['@@outStock'])
  const removeProductInCartStore = useStore((state) => state.deleteItemCart)
  const updateCartItems = useStore((state) => state.updateCartItems)

  const { data } = useSWR(
    'api/summary',
    async () =>
      await http
        .post('summary', {
          json: {
            products: serializeCartList(cartList),
            hasInventory: false,
          },
        })
        .json()
  )

  function changeQty(value, id) {
    const currentIndex = cartListUpdate.find((e) => e.id === id)
    if (!currentIndex) {
      setCartList([...cartListUpdate, { id, quantity: value }])
    } else {
      const updateItems = cartListUpdate.map((item) => {
        if (item.id === id)
          return {
            ...item,
            quantity: value,
          }
        return item
      })
      setCartList(updateItems)
    }
  }

  async function updateCart(e) {
    let button = e.currentTarget
    button.querySelector('.icon-refresh').classList.add('animate-spin')
    await updateCartItems(cartListUpdate, mutate)
    //await mutate('api/summary')
    toast.success('Productos actualizados correctamente.')
    button.querySelector('.icon-refresh').classList.remove('animate-spin')
  }

  function deleteItemCartSingle(id) {
    removeProductInCartStore(id)
    mutate('api/summary')
  }

  const renderBody = (data) => {
    return (
      <tbody>
        {data
          ? data.products.map((item) => (
              <tr className="border-b bg-white" key={item.id}>
                <th
                  scope="row"
                  className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 "
                >
                  <Link href={`/products/${item.slug}`}>
                    <a className="flex space-x-4">
                      <figure className="relative h-24 w-24 flex-shrink-0">
                        <Image
                          src={getStrapiMedia(item.thumbnail)}
                          layout="fill"
                          objectFit="cover"
                          alt={item.code}
                        />
                      </figure>
                      <div>
                        <h3 className="text-sm font-semibold">{`${item.code} - ${item.description}`}</h3>
                        <div className="text-gray-500">
                          <span className="pr-2 font-bold">Modelo:</span>
                          <span>{item.productBrand.name}</span>
                        </div>
                        <OutStock
                          idProduct={item.id}
                          outStock={outStock.products}
                        />
                      </div>
                    </a>
                  </Link>
                </th>
                <td className="py-4 px-6">
                  {item.hasDiscount ? (
                    <div>
                      <span className="text-lg font-semibold line-through opacity-50">
                        {currency(item.price).format()}
                      </span>
                      <span className="ml-2 text-lg font-semibold text-red-500">
                        {currency(item.singlePrice).format()}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      {currency(item.price).format()}
                    </span>
                  )}
                </td>
                <td className="py-4 px-6">
                  <Qty
                    value={item.quantity}
                    changeQty={(current) => changeQty(current, item.id)}
                    adClass="cart-product-quantity"
                  />
                </td>
                <td className="py-4 px-6">
                  <span className="text-lg font-bold text-gray-900">
                    {currency(
                      item.hasDiscount ? item.totalPriceSale : item.totalPrice
                    ).format()}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button onClick={() => deleteItemCartSingle(item.id)}>
                    <TrashIcon className="h-5 w-5 fill-current text-gray-500 hover:text-accent-500" />
                  </button>
                </td>
              </tr>
            ))
          : Array(5)
              .fill('1')
              .map((i, k) => (
                <tr key={k} className="animate-pulse py-4 ">
                  <td className="px-4 py-2 ">
                    <span className="block h-4  bg-slate-200  py-2" />
                  </td>
                  <td className=" px-4 py-2 ">
                    <span className="block h-4 bg-slate-200  py-2" />
                  </td>
                  <td className=" px-4 py-2 ">
                    <span className="block h-4 bg-slate-200  py-2" />
                  </td>
                  <td className=" px-4 py-2 ">
                    <span className="block h-4 bg-slate-200  py-2" />
                  </td>
                  <td className=" px-4 py-2 ">
                    <span className="block h-4 bg-slate-200  py-2" />
                  </td>
                </tr>
              ))}
      </tbody>
    )
  }
  console.log(cartList, data)

  return (
    <Layout>
      <div className="container mt-8 md:mt-16">
        <h3 className="text-2xl font-bold">Carrito de compras</h3>
        <table className="my-12 w-full text-left text-sm  text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700  ">
            <tr>
              <th scope="col" className="py-3 px-6">
                Producto
              </th>
              <th scope="col" className="py-3 px-6">
                Precio unitario
              </th>
              <th scope="col" className="py-3 px-6">
                Cantidad
              </th>
              <th scope="col" className="py-3 px-6">
                Precio Final
              </th>
              <th scope="col" className="py-3 px-6" />
            </tr>
          </thead>
          {isSSR() && (
            <>
              {cartList.length <= 0 ? (
                <tr>
                  <td colSpan="5">
                    <h3 className="block pt-12 text-center text-2xl">
                      El carrito de compra esta vacio.
                    </h3>
                    <p className="block text-center">
                      Te invitamos a agregar productos en nuestras secciones
                      correspondientes.
                    </p>
                  </td>
                </tr>
              ) : (
                renderBody(data)
              )}
            </>
          )}
        </table>
        <div className="flex items-end">
          <div className="ml-auto flex items-center">
            <div className="text-2xl">Total:</div>

            {!data ? (
              <div className="mx-4 animate-pulse py-4">
                <span className="block h-4 w-14 rounded bg-slate-400" />
              </div>
            ) : (
              <div className="ml-4 text-2xl font-bold">
                {currency(cartList.length >= 1 ? data.total : 0).format()}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full items-center space-x-8 py-8">
          <div className="w-1/3">
            <Link href="/">
              <a className="inline-flex items-center rounded-md border-2 border-black bg-gray-50 px-8 py-4 hover:bg-slate-100 active:bg-slate-200">
                Seguir comprando
              </a>
            </Link>
          </div>
          <div className="w-1/3 text-center">
            <button
              onClick={updateCart}
              className="inline-flex items-center rounded-md border-2 border-black bg-gray-50 px-8 py-4 hover:bg-slate-100 active:bg-slate-200"
            >
              <ArrowPathIcon className="h- icon-refresh mr-2 w-5" />
              <span>Actualizar carrito</span>
            </button>
          </div>
          <div className="w-1/3 text-right">
            {cartList.length > 0 && (
              <Link href="/checkout">
                <a className="inline-flex items-center rounded-md border-2 border-accent-500 bg-accent-500 px-8 py-4 font-bold text-white hover:bg-accent-400 active:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-20">
                  Realizar pedido
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CartPage
