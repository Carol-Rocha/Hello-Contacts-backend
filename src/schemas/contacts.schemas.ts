import { z } from "zod"
import { clientSchemaRequest, clientSchemaResponse } from "./clients.schemas"

export const contactSchema = z.object({
  id: z.string(),
  full_name: z.string().max(120),
  email: z.string().email().max(120),
  telephone: z.string().refine((value) => /^\d{11}$/.test(value), {
    message: "Telefone inválido"
  }),
  createdAt: z.string().nullish(),
  updatedAt: z.string().nullish(),
  client: clientSchemaResponse
})

export const contactSchemaRequest = z.object({ 
  full_name: z.string().max(120),
  email: z.string().email().max(120),
  telephone: z.string().refine((value) => /^\d{11}$/.test(value), {
    message: "Telefone inválido"
  }),
  client: clientSchemaRequest
})


export const updatedContactSchema = contactSchemaRequest.partial()