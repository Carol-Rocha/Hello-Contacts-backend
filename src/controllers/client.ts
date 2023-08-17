import { Request, Response } from "express"
import { createClientService } from "../services/clients/createClient.service"
import { TClientRequest } from "../interfaces/clients.interfaces"

export const createClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clientData: TClientRequest = req.body
  const newCLient = await createClientService(clientData)
  return res.status(201).json(newCLient)
}