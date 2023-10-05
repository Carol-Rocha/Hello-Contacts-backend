import { Router } from 'express'
import {
  createContactsController,
  deleteContactsController,
  listContactsController,
  updateContactsController
} from '../controllers/contacts.controllers'
import { ensureTokenIsValidMiddleware } from '../middlewares/clients/ensureTokenIsValid.middleware'
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middleware'
import {
  contactSchemaRequest,
  updatedContactSchema
} from '../schemas/contacts.schemas'
import { verifyContactEmailExistMiddleware } from '../middlewares/contacts/verifyEmailExist.middleware'
import { verifyContactNumberExistMiddleware } from '../middlewares/contacts/verifyNumberExist.middleware'

export const contactsRoutes: Router = Router()

contactsRoutes.post(
  '',
  ensureDataIsValidMiddleware(contactSchemaRequest),
  ensureTokenIsValidMiddleware,
  // verifyContactEmailExistMiddleware,
  // verifyContactNumberExistMiddleware,
  createContactsController
)

contactsRoutes.get('', ensureTokenIsValidMiddleware, listContactsController)

contactsRoutes.patch(
  '/:id',
  ensureDataIsValidMiddleware(updatedContactSchema),
  ensureTokenIsValidMiddleware,
  updateContactsController
)

contactsRoutes.delete('/:id', deleteContactsController)
