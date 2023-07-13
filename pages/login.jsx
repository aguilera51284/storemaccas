import Layout from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import LoginSchema from '@/schema/login'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(LoginSchema) })
  const router = useRouter()
  const onSubmit = (data) => {
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then(({ ok, error }) => {
      if (ok) {
        router.push('/')
      } else {
        setError('serverError', {
          message: 'Usuario o contrasena incorrectas. vuelva a intentar.',
        })
        console.warn('error: ', error)
      }
    })
  }
  return (
    <Layout>
      <div className="bg-slate-100 py-12 md:py-24">
        <div className="mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white shadow-md ">
          <div className="p-8">
            <Link href="/">
              <Image
                src="/images/logo.jpeg"
                width={300}
                height={104}
                alt="Maccas"
              />
            </Link>
            <h3 className="mt-1 text-center text-xl font-medium text-gray-600 ">
              Bienvenido
            </h3>

            <p className="mt-1 text-center text-gray-500 ">
              Iniciar sesion o crear cuenta
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {errors.serverError && (
                <p className="mt-2 rounded bg-accent-100 px-4 py-2 text-center text-sm text-red-500 ">
                  {errors.serverError?.message || ''}
                </p>
              )}

              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-gray-600 ">
                  Email
                </label>
                <input
                  className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                  type="email"
                  {...register('email')}
                />
                <p className="mt-2 text-sm text-red-500 ">
                  {errors.email?.message || ''}
                </p>
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="mb-2 block text-sm font-medium text-gray-600 ">
                    Password
                  </label>
                </div>

                <input
                  className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                  type="password"
                  {...register('password')}
                />
                <p className="mt-2 text-sm text-red-500 ">
                  {errors.password?.message || ''}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Link href="/forgot-password">
                  <a className="text-sm text-gray-600 hover:text-gray-500 ">
                    Olvidaste tu contrasena?
                  </a>
                </Link>
                <button
                  className="transform rounded bg-primary-700 px-4 py-2 leading-5 text-white transition-colors duration-300 hover:bg-primary-600 focus:outline-none disabled:opacity-40"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className=" gg-spinner mx-auto" />
                  ) : (
                    <span>Login</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center justify-center bg-primary-800 py-4 text-center">
            <span className="text-sm text-white ">No tienes cuenta?</span>

            <Link href="/register">
              <a className="mx-2 text-sm font-bold text-primary-500 hover:underline dark:text-primary-400">
                Registrate
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login
