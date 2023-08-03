import { useForm, Controller } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
import Layout from '@/components/layout'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import http from '@/lib/http'

const schema = z.object({
  fullName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no debe exceder los 100 caracteres'),
  email: z.string().email('El email no es válido'),
  phone: z
    .string()
    .min(7, 'El número de teléfono debe tener al menos 7 dígitos')
    .max(20, 'El número de teléfono no debe exceder los 20 dígitos'),
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(500, 'El mensaje no debe exceder los 500 caracteres'),
  recaptchaToken: z.string().min(1, 'El campo es requerido'),
})

function Contact() {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try {
      await http.post('contacts', { json: { data } })
      reset()
      toast.success('Gracias por contactarnos', { position: 'bottom-center' })
    } catch (error) {
      toast.error('Error al enviar los datos. Intentelo de nuevo')
    }
  }
  return (
    <Layout>
      <div className="bg-slate-100 py-12 md:py-24">
        <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-lg bg-white p-8 shadow-md">
          <EnvelopeIcon className="mt-2 h-20 w-20 text-accent-500" />
          <h1 className="text-5xl font-semibold">Contactanos</h1>
          <p className="mt-2 text-sm text-gray-500">
            En MACCAS, valoramos tu opinión y estamos comprometidos a brindarte
            el mejor servicio posible. Si tienes alguna pregunta, inquietud o
            simplemente deseas obtener más información sobre nuestros productos
            y servicios, no dudes en contactarnos.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-12 grid grid-cols-2 gap-8"
          >
            <div className="">
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-gray-600 "
              >
                Nombre Completo:
              </label>
              <Controller
                name="fullName"
                control={control}
                type="text"
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                  />
                )}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-600 "
              >
                Email
              </label>
              <Controller
                name="email"
                control={control}
                type="text"
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                  />
                )}
              />
              {errors.email && (
                <p className="text-xs text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="">
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-600 "
              >
                Télefono:
              </label>
              <Controller
                name="phone"
                control={control}
                type="text"
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                  />
                )}
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="col-span-2">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-600 "
              >
                Mensaje:
              </label>
              <Controller
                name="message"
                control={control}
                type="text"
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows="4"
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                  />
                )}
              />
              {errors.message && (
                <p className="text-xs text-red-500">{errors.message.message}</p>
              )}
            </div>

            <div>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY} // Replace with your actual reCAPTCHA site key
                onChange={(value) => setValue('recaptchaToken', value)}
                allowAnyHost
              />
              {errors.recaptchaToken && (
                <p className="text-xs text-red-500">
                  {errors.recaptchaToken.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <button
                disabled={isSubmitting}
                className="rounded-md  bg-accent-500 px-8 py-2 font-semibold uppercase text-white disabled:opacity-50"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
