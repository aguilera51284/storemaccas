import Layout from '@/components/layout'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

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
              Recuperacion de cuenta
            </h3>

            <form onSubmit={handleSubmit(onSubmit)}>
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
              <div className="mt-4 flex items-center justify-between">
                <button
                  className="w-full transform rounded bg-primary-700 px-4 py-2 leading-5 text-white transition-colors duration-300 hover:bg-primary-600 focus:outline-none"
                  type="button"
                >
                  Recuperar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ForgotPassword
