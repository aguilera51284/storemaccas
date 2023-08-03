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

//TODO: Agregar los productos sin stock
const CartPage = () => {
  const [cartListUpdate, setCartList] = useState([])
  const cartList = useStore((state) => state['@@cart'])
  const outStock = useStore((state) => state['@@outStock'])
  const removeProductInCartStore = useStore((state) => state.deleteItemCart)
  const updateCartItems = useStore((state) => state.updateCartItems)

  function changeQty(value, id) {
    const updateItems = cartList.map((item) => {
      if (item.id === id)
        return {
          ...item,
          quantity: value,
        }
      return item
    })
    console.log('uppdating quantity', updateItems)
    setCartList(updateItems)
  }

  async function updateCart(e) {
    let button = e.currentTarget
    button.querySelector('.icon-refresh').classList.add('animate-spin')
    console.log('sendValidation', cartListUpdate)
    await updateCartItems(cartListUpdate)
    toast.success('Productos actualizados correctamente.')
    button.querySelector('.icon-refresh').classList.remove('animate-spin')
  }

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
          <tbody>
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
                  cartList.map((item) => (
                    <tr className="border-b bg-white" key={item.id}>
                      <th
                        scope="row"
                        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 "
                      >
                        <Link href={`/products/${item.slug}`}>
                          <a className="flex space-x-4">
                            <figure className="relative h-24 w-24 flex-shrink-0">
                              <Image
                                src={item.image}
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
                            <span className="mr-2 text-lg font-semibold text-red-500">
                              {currency(item.totalPriceTax).format()}
                            </span>
                            <span className="text-lg font-semibold line-through opacity-50">
                              {currency(item.priceTax).format()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">
                            {currency(item.priceTax).format()}
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
                            item.hasDiscount
                              ? item.totalPriceTax
                              : item.priceTax
                          )
                            .multiply(item.quantity)
                            .format()}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => removeProductInCartStore(item.id)}
                        >
                          <TrashIcon className="h-5 w-5 fill-current text-gray-500 hover:text-accent-500" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </>
            )}
          </tbody>
        </table>
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
