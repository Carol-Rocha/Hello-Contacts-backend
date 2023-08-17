import { Request, Response } from "express"
import { createClientService } from "../services/clients/createClient.service"
import { TClientRequest, TClientUpdateRequest } from "../interfaces/clients.interfaces"
import { updateClientService } from "../services/clients/uptadeClient.service"

export const createClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clientData: TClientRequest = req.body
  const newCLient = await createClientService(clientData)
  return res.status(201).json(newCLient)
}

export const updateClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {clientId} = res.locals
  const clientData: TClientUpdateRequest = req.body
  const updatedClient = await updateClientService(clientData, clientId)

  return res.json(updatedClient)
}