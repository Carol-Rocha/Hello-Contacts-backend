import { z } from 'zod'
import { clientSchemaResponse } from './clients.schemas'

export const contactSchema = z.object({
  id: z.string(),
  full_name: z.string().max(120),
  email: z.string().email().max(120),
  telephone: z.string(),
  createdAt: z.string().nullish(),
  updatedAt: z.string().nullish(),
  client: clientSchemaResponse
})

export const contactSchemaRequest = z.object({
  full_name: z.string().max(120),
  email: z.string().email().max(120),
  telephone: z.string()
})

export const updatedContactSchema = contactSchemaRequest.partial()
