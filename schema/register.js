import { z } from 'zod'

const RegisterSchema = z.object({
  email: z.string().email({ message: 'El email no es valido.' }),
  password: z
    .string()
    .min(12, { message: 'La contraseña debe ser minimo de 12 caracteres' }),
  phone: z.string().min(1),
  companyName: z.string(),
  ...(process.env.NODE_ENV === 'production'
    ? {
        token: z
          .string({
            required_error: 'El captcha es requerido.',
          })
          .min(1, { message: 'El captcha es requerido.' }),
      }
    : {}),
})

export default RegisterSchema
