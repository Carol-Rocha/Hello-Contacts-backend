import { Router } from 'express'
import { ensureClientExistMiddleware } from '../middlewares/clients/ensureClientExist.middleware'
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middleware'
import {
  clientSchemaRequest,
  updatedClientSchema
} from '../schemas/clients.schemas'
import { verifyEmailExistMiddleware } from '../middlewares/clients/verifyEmailExist.middleware'
import { ensureTokenIsValidMiddleware } from '../middlewares/clients/ensureTokenIsValid.middleware'
import { ensureClientIsOwnerMiddleware } from '../middlewares/clients/ensureClientIsOwner.middleware'
import {
  createClientController,
  deleteClientController,
  retrieveClientController,
  updateClientController
} from '../controllers/client.controllers'
import { verifyClientIsDeletedMiddleware } from '../middlewares/clients/verifyClientIsDeleted.middleware'

export const clientRoutes: Router = Router()

clientRoutes.post(
  '',
  ensureDataIsValidMiddleware(clientSchemaRequest),
  verifyEmailExistMiddleware,
  createClientController
)

clientRoutes.get(
  '/:id',
  ensureTokenIsValidMiddleware,
  ensureClientExistMiddleware,
  ensureClientIsOwnerMiddleware,
  retrieveClientController
)

clientRoutes.patch(
  '/:id',
  ensureDataIsValidMiddleware(updatedClientSchema),
  ensureTokenIsValidMiddleware,
  ensureClientExistMiddleware,
  ensureClientIsOwnerMiddleware,
  updateClientController
)

clientRoutes.delete(
  '/:id',
  ensureTokenIsValidMiddleware,
  ensureClientExistMiddleware,
  verifyClientIsDeletedMiddleware,
  ensureClientIsOwnerMiddleware,
  deleteClientController
)
