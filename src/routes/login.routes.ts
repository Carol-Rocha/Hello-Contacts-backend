import { Router } from "express";
import { createTokenController } from "../controllers/login.controllers";

export const loginRoutes: Router = Router()

loginRoutes.post("", createTokenController)