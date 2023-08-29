import Layout from '@/components/layout'
import ProtectedPage from '@/components/protectedPage'
import Spinner from '@/components/icons/spinner.svg'
import { useRouter } from 'next/router'
import useOrdersDetail from '@/hooks/useOrderDetail'
import { getStrapiMedia } from '@/lib/strapi'
import Image from 'next/image'
import currency from 'currency.js'
import OrderItem from '@/components/orderStatus'

function calculateOrderTotalPaidSum(products) {
  return products.reduce(
    (total, product) => total + product.attributes.totalPaid,
    0
  )
}

function OrderDetail() {
  const router = useRouter()
  const { order, isLoading } = useOrdersDetail(router.query.reference)

  return (
    <Layout>
      <ProtectedPage>
        <div className="container min-h-screen py-12">
          <div className="flex">
            <h2 className="mr-8 text-3xl  font-semibold">{`Orden: #${router.query.reference}`}</h2>
            {!isLoading && order && (
              <OrderItem status={order.attributes.status} />
            )}
          </div>
          {isLoading ? (
            <div className="flex min-h-screen items-center justify-center">
              <Spinner className=" h-16 w-16 animate-spin" />
            </div>
          ) : (
            <div className="mt-6 flex space-x-6">
              {order ? (
                <>
                  <div className="w-2/3">
                    <div className="rounded-md bg-slate-100 p-4">
                      <div>
                        <h2 className="text-lg font-semibold ">Productos</h2>
                        <ul>
                          {order.attributes.orderProducts.data.map(
                            (product) => (
                              <li
                                key={`product-${product.attributes.code}`}
                                className="py-6"
                              >
                                <div className="flex">
                                  <figure className="relative h-24 w-24 flex-shrink-0">
                                    <Image
                                      src={getStrapiMedia(
                                        product.attributes.productReference.data
                                          .attributes.thumbnail.data
                                      )}
                                      layout="fill"
                                      objectFit="cover"
                                      alt={product.attributes.code}
                                    />
                                  </figure>
                                  <div className="px-6">
                                    <h3 className="font-semibold">{`${product.attributes.productReference.data.attributes.code} - ${product.attributes.productReference.data.attributes.description}`}</h3>
                                    <div>
                                      <span>{`${
                                        product.attributes.quantity
                                      }x ${currency(
                                        product.attributes.price
                                      ).format()}`}</span>
                                    </div>
                                    <div className="text-lg font-bold">
                                      {`TOTAL: ${currency(
                                        product.attributes.totalPaid
                                      ).format()}`}
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                        <div className="text-right text-2xl font-semibold">
                          <span>Total de la orden</span>
                          <div>
                            {currency(
                              calculateOrderTotalPaidSum(
                                order.attributes.orderProducts.data
                              )
                            ).format()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="rounded-md bg-slate-100 p-4">
                      <h2 className="text-lg font-semibold ">
                        Dirección de envio
                      </h2>
                      {order.attributes.orderAddress.data ? (
                        <div>
                          <div>
                            <strong> Datos de contacto:</strong>
                            <ul>
                              <li>
                                <label htmlFor="phone">Nombre: </label>
                                <span>
                                  {`${order.attributes.orderAddress.data.attributes.firstName} ${order.attributes.orderAddress.data.attributes.lastName}`}
                                </span>
                              </li>
                              <li>
                                <label htmlFor="phone">Telefono: </label>
                                <span>
                                  {`${order.attributes.orderAddress.data.attributes.phone} `}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <strong>Entregar en:</strong>
                            <p>
                              <span>{`${order.attributes.orderAddress.data.attributes.address}`}</span>
                              <span>{`#${order.attributes.orderAddress.data.attributes.numExt},`}</span>
                              <span>{`${order.attributes.orderAddress.data.attributes.colony}, `}</span>
                              <span>{`CP:${order.attributes.orderAddress.data.attributes.postalCode},`}</span>
                              <span>{`${order.attributes.orderAddress.data.attributes.city}`}</span>
                              <span>{`${order.attributes.orderAddress.data.attributes.state}`}</span>
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p>Sin direccion</p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <h3 className="font-semibold text-primary-600">404 Error</h3>
                  <p className="text-4xl font-semibold text-gray-800 sm:text-5xl">
                    No hay información sobre esta orden.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </ProtectedPage>
    </Layout>
  )
}

export default OrderDetail
