import { Router } from "express";
import { ensureClientExistMiddleware } from "../middlewares/clients/ensureClientExist.middleware";
import { createClientController, updateClientController } from "../controllers/client";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { clientSchemaRequest, updatedClientSchema } from "../schemas/clients.schemas";
import { verifyEmailExistMiddleware } from "../middlewares/clients/verifyEmailExist.middleware";
import { verifyUserNameExistMiddleware } from "../middlewares/clients/verifyUserNameExist.middleware";

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
  ensureClientExistMiddleware,
  verifyUserNameExistMiddleware,
  verifyEmailExistMiddleware, 
  updateClientController
)