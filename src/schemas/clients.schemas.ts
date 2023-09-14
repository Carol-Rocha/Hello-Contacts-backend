import { z } from 'zod'

export const clientSchema = z.object({
  id: z.string(),
  full_name: z.string().max(120),
  email: z.string().email().max(120),
  password: z.string().max(100).min(6),
  telephone: z.string().refine((value) => /^\d{11}$/.test(value), {
    message: 'Telefone inválido'
  }),
  createdAt: z.string().nullish(),
  updatedAt: z.string().nullish(),
  deletedAt: z.string().nullish()
})

export const clientSchemaRequest = clientSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true
})

export const clientSchemaResponse = clientSchema.omit({ password: true })

export const updatedClientSchema = clientSchemaRequest.partial()
