import { Request, Response } from "express";
import { TLoginRequest } from "../interfaces/login.interfaces";
import { createTokenService } from "../services/login/createToken.service";

export const createTokenController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData: TLoginRequest = req.body
  const token = await createTokenService(loginData)
  return res.json({"token": token})
}