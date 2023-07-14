import Layout from '@/components/layout'
import dynamic from 'next/dynamic'

const CheckoutForm = dynamic(() => import('@/components/checkout'), {
  ssr: false,
})

const Checkout = () => {
  return (
    <Layout>
      <div className="min-h-screen w-full">
        <div className="bg-gray-100">
          <div className="mx-auto px-4 py-12 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 ">
            <div className="mb-10 max-w-xl sm:text-center md:mx-auto md:mb-12 lg:max-w-2xl">
              <div>
                <p className="bg-teal-accent-400 mb-4 inline-block rounded-full px-3 py-px text-xs font-semibold uppercase tracking-wider text-teal-900">
                  Checkout
                </p>
              </div>
              <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                  <svg
                    viewBox="0 0 52 24"
                    fill="currentColor"
                    className="absolute top-0 left-0 z-0 -mt-8 -ml-20 hidden w-32 text-blue-400 sm:block lg:-ml-28 lg:-mt-10 lg:w-32"
                  >
                    <defs>
                      <pattern
                        id="dc223fcc-6d72-4ebc-b4ef-abe121034d6e"
                        x="0"
                        y="0"
                        width=".135"
                        height=".30"
                      >
                        <circle cx="1" cy="1" r=".7" />
                      </pattern>
                    </defs>
                    <rect
                      fill="url(#dc223fcc-6d72-4ebc-b4ef-abe121034d6e)"
                      width="52"
                      height="24"
                    />
                  </svg>
                </span>
                <span className="relative z-10">Completa tu orden</span>
              </h2>
            </div>
          </div>
        </div>
        {/* Checkout Component */}
        <div className="container mt-12">
          <CheckoutForm />
        </div>
      </div>
    </Layout>
  )
}

export default Checkout
