import { useState } from 'preact/hooks'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/layout'

import SuccessRegister from '@/components/messages/successRegister'

const RegisterPage = () => {
  //const captchaRef = useRef(null);
  const [success] = useState(false)
  const [email] = useState(null)

  return (
    <Layout>
      <div className="bg-slate-100 py-12 md:py-24">
        {success ? (
          <SuccessRegister email={email} />
        ) : (
          <div className="mx-auto flex min-h-min w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg  lg:max-w-4xl">
            <div
              className="hidden lg:block lg:w-1/2"
              style="background-image: url('/images/register.jpg');"
            ></div>

            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
              <Link href="/">
                <Image
                  src="/images/logo.jpeg"
                  width={300}
                  height={104}
                  alt="Maccas"
                />
              </Link>

              <p className="text-center text-xl text-gray-600 ">
                Cree una nueva cuenta.
              </p>

              <div className="my-4">
                <p>
                  ¡Bienvenido! Si estás interesado en crear una cuenta, estás en
                  el lugar indicado. Para comenzar, te invitamos a comunicarte
                  con nosotros a través de nuestros canales de contacto. Puedes
                  hacerlo llamando a nuestro número de teléfono o enviándonos un
                  correo electrónico. Nuestro equipo estará encantado de
                  ayudarte a configurar tu cuenta y responder cualquier pregunta
                  que puedas tener. ¡Esperamos poder ofrecerte una experiencia
                  excepcional!
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-bold text-gray-600">
                  <span>Ya tienes cuenta? Inicia sesion</span>
                  <Link href="login">
                    <a
                      href="#"
                      className="pl-2  text-xs uppercase text-primary-500 hover:underline "
                    >
                      aqui
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default RegisterPage
