import { z } from "zod"
import {
  clientSchema,
  clientSchemaRequest,
  clientSchemaResponse,
  updatedClientSchema
} from "../schemas/clients.schemas"
import { DeepPartial } from "typeorm"


export type TCLient = z.infer<typeof clientSchema>
export type TClientRequest = z.infer<typeof clientSchemaRequest>
export type TClientResponse = z.infer<typeof clientSchemaResponse>
export type TClientUpdateRequest = DeepPartial<typeof updatedClientSchema>
