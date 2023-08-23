import { Request, Response } from "express";
import { TContactRequest } from "../interfaces/contacts.interfaces";
import { createContactsService } from "../services/contacts/createContacts.service";
import { listContactsSerivce } from "../services/contacts/listContacts.service";
import { deleteContactsService } from "../services/contacts/deleteContacts.service";

export const createContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {clientId} = res.locals
  const contactData: TContactRequest = req.body
  const newContact = await createContactsService(contactData,clientId)

  return res.status(201).json(newContact)
}

export const listContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {clientTokenId} = res.locals
  const contacts = await listContactsSerivce(clientTokenId)
  return res.json(contacts)
}

export const deleteContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactId: string = req.params.id
  await deleteContactsService(contactId)
  return res.status(204).send()
}