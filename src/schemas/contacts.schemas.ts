import { z } from "zod"

export const contactSchema = z.object({
  id: z.string(),
  full_name: z.string().max(120),
  email: z.string().email().max(120),
  telephone: z.string().refine((value) => /^\d{11}$/.test(value), {
    message: "Telefone inválido"
  }),
  createdAt: z.string().nullish(),
  updatedAt: z.string().nullish(),
  clientId: z.string()
})

export const contactSchemaRequest = contactSchema.omit({ 
  id: true,
  createdAt: true,
  updatedAt: true, 
  clientId:true 
})

export const updatedContactSchema = contactSchemaRequest.partial()