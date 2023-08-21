import { Router } from "express";
import { ensureClientExistMiddleware } from "../middlewares/clients/ensureClientExist.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { clientSchemaRequest, updatedClientSchema } from "../schemas/clients.schemas";
import { verifyEmailExistMiddleware } from "../middlewares/clients/verifyEmailExist.middleware";
import { verifyUserNameExistMiddleware } from "../middlewares/clients/verifyUserNameExist.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/clients/ensureTokenIsValid.middleware";
import { ensureClientIsOwnerMiddleware } from "../middlewares/clients/ensureClientIsOwner.middleware";
import { createClientController, updateClientController } from "../controllers/client.controllers";

export const clientRoutes: Router = Router()

clientRoutes.post(
  "",
  ensureDataIsValidMiddleware(clientSchemaRequest),
  verifyUserNameExistMiddleware,
  verifyEmailExistMiddleware, 
  createClientController
)

clientRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(updatedClientSchema),
  ensureTokenIsValidMiddleware,
  ensureClientExistMiddleware,
  ensureClientIsOwnerMiddleware,
  verifyUserNameExistMiddleware,
  verifyEmailExistMiddleware, 
  updateClientController
)