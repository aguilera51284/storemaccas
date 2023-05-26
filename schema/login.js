import { z } from "zod";

const RegisterSchema = z.object({
  email: z.string().email({ message: 'El email no es valido.' }),
  password: z.string().min(1, { message: 'Este campo es requerido.' })
});

export default RegisterSchema;
