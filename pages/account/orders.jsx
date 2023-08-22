import Layout from '@/components/layout'
import ProtectedPage from '@/components/protectedPage'
import useOrdersAccounts from '@/hooks/useOrdersAccounts'
import dayjs from 'dayjs'
import currency from 'currency.js'
import OrderItem from '@/components/orderStatus'
import Link from 'next/link'
import Spinner from '@/components/icons/spinner.svg'

function calculateOrderTotalPaidSum(order) {
  return order.orderProducts.reduce(
    (total, product) => total + product.totalPaid,
    0
  )
}

function Orders() {
  const { orders, isLoading } = useOrdersAccounts()

  return (
    <Layout>
      <ProtectedPage>
        <div className="container min-h-screen py-12">
          <h2 className="text-3xl font-semibold">Lista de Pedidos</h2>
          {isLoading ? (
            <div className="flex min-h-screen items-center justify-center">
              <Spinner className=" h-16 w-16 animate-spin" />
            </div>
          ) : (
            <div className="-my-2 mt-12 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          N° de Orden
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Productos (códigos)
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Estatus
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Fecha de creacion
                        </th>
                        {/* ... Añadir más encabezados aquí ... */}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {order.reference}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-900">
                              <ul>
                                {order.orderProducts.map((product) => (
                                  <li key={product.code}>
                                    <Link href={`/products/${product.code}`}>
                                      {product.code}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-900">
                              <OrderItem status={order.status} />
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {currency(
                                calculateOrderTotalPaidSum(order)
                              ).format()}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {dayjs(order.createdAt).format('DD-MM-YYYY')}
                            </div>
                          </td>
                          {/* ... Añadir más celdas aquí ... */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </ProtectedPage>
    </Layout>
  )
}

export default Orders
