import { Router } from "express";
import { createContactsController, deleteContactsController, listContactsController, updateContactsController } from "../controllers/contacts.controllers";
import { ensureTokenIsValidMiddleware } from "../middlewares/clients/ensureTokenIsValid.middleware";

export const contactsRoutes: Router = Router()

contactsRoutes.post(
  "",
  ensureTokenIsValidMiddleware, 
  createContactsController
)

contactsRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  listContactsController
)

contactsRoutes.patch(
  "/:id",
  ensureTokenIsValidMiddleware,
  updateContactsController
)

contactsRoutes.delete(
  "/:id",
  deleteContactsController
)