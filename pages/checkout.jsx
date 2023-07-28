import { useState } from 'preact/hooks'
import Layout from '@/components/layout'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const CheckoutForm = dynamic(() => import('@/components/checkout'), {
  ssr: false,
})

const Checkout = () => {
  const [showSucess, setSuccess] = useState(true)
  if (showSucess) {
    return (
      <Layout>
        <div className="min-h-screen w-full py-8">
          {/* Checkout Component */}
          <div className="container mt-12  flex flex-col">
            <div className="self-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="220.17"
                height="215.858"
                className="mx-auto"
                viewBox="0 0 220.17 215.858"
              >
                <g
                  id="Group_38069"
                  data-name="Group 38069"
                  transform="translate(-848.671 -303.142)"
                >
                  <g
                    id="Group_37982"
                    data-name="Group 37982"
                    transform="translate(-3.363 -9)"
                  >
                    <circle
                      id="Ellipse_21417"
                      data-name="Ellipse 21417"
                      cx="56.5"
                      cy="56.5"
                      r="56.5"
                      transform="translate(907.363 366)"
                      fill="#16be01"
                    />
                    <path
                      id="Path_68853"
                      data-name="Path 68853"
                      d="M562.728,13845.56l16,16.381,27.8-28.159"
                      transform="translate(379.234 -13426.008)"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="9"
                    />
                  </g>
                  <circle
                    id="Ellipse_21418"
                    data-name="Ellipse 21418"
                    cx="5.715"
                    cy="5.715"
                    r="5.715"
                    transform="translate(1057.412 414.612)"
                    fill="#7849e5"
                  />
                  <circle
                    id="Ellipse_21419"
                    data-name="Ellipse 21419"
                    cx="6.852"
                    cy="6.852"
                    r="6.852"
                    transform="translate(934.436 303.142)"
                    fill="#1088ff"
                    opacity="0.413"
                  />
                  <circle
                    id="Ellipse_21420"
                    data-name="Ellipse 21420"
                    cx="3.077"
                    cy="3.077"
                    r="3.077"
                    transform="translate(957.209 321.627)"
                    fill="#16be00"
                  />
                  <circle
                    id="Ellipse_21421"
                    data-name="Ellipse 21421"
                    cx="6.594"
                    cy="6.594"
                    r="6.594"
                    transform="translate(882.049 366.333)"
                    fill="#f40354"
                  />
                  <circle
                    id="Ellipse_21422"
                    data-name="Ellipse 21422"
                    cx="3.767"
                    cy="3.767"
                    r="3.767"
                    transform="translate(906.363 475.542)"
                    fill="#7849e5"
                    opacity="0.413"
                  />
                  <g
                    id="Ellipse_21423"
                    data-name="Ellipse 21423"
                    transform="translate(943.602 503.175)"
                    fill="none"
                    stroke="#1088ff"
                    strokeWidth="4"
                  >
                    <circle cx="7.912" cy="7.912" r="7.912" stroke="none" />
                    <circle cx="7.912" cy="7.912" r="5.912" fill="none" />
                  </g>
                  <circle
                    id="Ellipse_21424"
                    data-name="Ellipse 21424"
                    cx="3.517"
                    cy="3.517"
                    r="3.517"
                    transform="translate(961.042 496.142)"
                    fill="#b6d7f7"
                  />
                  <circle
                    id="Ellipse_21425"
                    data-name="Ellipse 21425"
                    cx="2.517"
                    cy="2.517"
                    r="2.517"
                    transform="translate(1050.881 400.669)"
                    fill="#1088ff"
                  />
                  <path
                    id="Path_68854"
                    data-name="Path 68854"
                    d="M525.292,13899.342s14.775,2.783,15.843,20.6"
                    transform="translate(487.306 -13429.342)"
                    fill="none"
                    stroke="#7849e5"
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                  <path
                    id="Path_68855"
                    data-name="Path 68855"
                    d="M322,13864.766s15.275,4.559,19.86-9.443-6.779-14.164-8.488-9.486,1.733,11.629,12.956,9.486c6.823-1.445,10.155-7.625,10.155-7.625"
                    transform="translate(529.159 -13415.479)"
                    fill="none"
                    stroke="#1088ff"
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                  <path
                    id="Path_68856"
                    data-name="Path 68856"
                    d="M537.559,13744.749s14.361,1.289,17.971-12.325,5.813-15.1,10.5-16.861"
                    transform="translate(490.882 -13387.781)"
                    fill="none"
                    stroke="#7849e5"
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                </g>
              </svg>
              <h1 className="text-center font-roboto text-4xl font-semibold">
                La orden de compra ha sido creada
              </h1>
              <p className="mx-auto mt-5 max-w-2xl">
                Queremos agradecerte por tu confianza en nuestra marca y
                esperamos que disfrutes al máximo de tus nuevos productos. Si
                tienes alguna pregunta o necesitas asistencia adicional, no
                dudes en contactarnos en cualquier momento. Nuestro equipo de
                atención al cliente está aquí para ayudarte en todo lo que
                necesites.
              </p>
              <div className="mt-5 text-center">
                <Link href="/">
                  <a className="rounded-md  bg-accent-500 px-8 py-2 font-semibold uppercase text-white disabled:opacity-50">
                    Regresar al inicio
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

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
          <CheckoutForm setSuccess={setSuccess} />
        </div>
      </div>
    </Layout>
  )
}

export default Checkout
