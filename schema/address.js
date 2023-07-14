import { z } from 'zod'

const langMessages = {
  min: 'El campo es requerido',
}

const ShippingAddressSchema = z.object({
  firstName: z.string().min(1, { message: langMessages.min }),
  lastName: z.string().min(1, { message: langMessages.min }),
  phone: z.string().min(1, { message: langMessages.min }),
  address1: z.string().min(1, { message: langMessages.min }),
  address2: z.string(),
  numExt: z.string().min(1, { message: langMessages.min }),
  colony: z.string().min(1, { message: langMessages.min }),
  state: z.string().min(1, { message: langMessages.min }),
  city: z.string().min(1, { message: langMessages.min }),
  province: z.string(),
  postalCode: z.string().min(1, { message: langMessages.min }),
})

export default ShippingAddressSchema
