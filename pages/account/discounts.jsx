import Layout from '@/components/layout'
import ProtectedPage from '@/components/protectedPage'
import useUserMe from '@/hooks/useUserMe'
import Spinner from '@/components/icons/spinner.svg'

function Discount() {
  const { user, isLoading } = useUserMe()

  return (
    <Layout>
      <ProtectedPage>
        <div className="container min-h-screen py-12">
          <h2 className="text-3xl font-semibold">Mis descuentos</h2>
          {isLoading ? (
            <div className="flex min-h-screen items-center justify-center">
              <Spinner className=" h-16 w-16 animate-spin" />
            </div>
          ) : (
            <div>
              {user.Discounts ? (
                <section className="py-14">
                  <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                    <ul className="flex md:flex-wrap">
                      {user.Discounts.map((item, idx) => (
                        <li
                          key={idx}
                          className="rounded-md border border-primary-200 p-4 text-center"
                        >
                          <h4 className="text-4xl font-semibold text-gray-800">
                            {item.productBrand.name}
                          </h4>
                          <p className="mt-3 text-2xl font-bold text-accent-600">
                            {item.value}%
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              ) : (
                <div className="mx-auto mt-12 flex h-screen max-w-screen-xl justify-start px-4 md:px-8">
                  <div className="mx-auto max-w-lg space-y-3 text-center">
                    <h3 className="text-4xl font-semibold text-gray-800 sm:text-5xl">
                      Sin descuentos
                    </h3>
                    <p className="text-gray-600">
                      No tienes descuentos agregados aún.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </ProtectedPage>
    </Layout>
  )
}

export default Discount
