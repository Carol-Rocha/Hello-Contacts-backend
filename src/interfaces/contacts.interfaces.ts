import { z } from "zod"
import {
  contactSchema,
  contactSchemaRequest,
  updatedContactSchema
} from "../schemas/contacts.schemas"
import { DeepPartial } from "typeorm"


export type TContact = z.infer<typeof contactSchema>
export type TContactRequest = z.infer<typeof contactSchemaRequest>
export type TUpdateContactRequest = DeepPartial<typeof updatedContactSchema>