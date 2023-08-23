import { Router } from "express";
import { createContactsController, listContactsController } from "../controllers/contacts.controllers";
import { ensureClientExistMiddleware } from "../middlewares/clients/ensureClientExist.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/clients/ensureTokenIsValid.middleware";
import { ensureClientIsOwnerMiddleware } from "../middlewares/clients/ensureClientIsOwner.middleware";

export const contactsRoutes: Router = Router()

contactsRoutes.post("/:id", ensureClientExistMiddleware, createContactsController)
contactsRoutes.get("",ensureTokenIsValidMiddleware,listContactsController)