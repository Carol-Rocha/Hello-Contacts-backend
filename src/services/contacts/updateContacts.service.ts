import { Repository } from "typeorm";
import { TContact,  TUpdateContactRequest } from "../../interfaces/contacts.interfaces";
import { Contact } from "../../entities/contacts.entity";
import { AppDataSource } from "../../data-source";
import { contactSchema } from "../../schemas/contacts.schemas";
import { Client } from "../../entities/clients.entity";
import { AppError } from "../../errors/AppError";

export const updateContactService = async (
  contactData: TUpdateContactRequest,
  contactId: string,
  clientId: string
): Promise<TContact> => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

  const client: Client | null = await clientRepository.findOne({where: {id: clientId}})

  if (!client) {
    throw new AppError ("User not found", 404)
  }

  const oldContactData: Contact = await contactRepository.findOneOrFail(
    {
      where: {
        id: contactId
      }
    }
  )
  const updatedContact: Contact = await contactRepository.save(
    {
      ...oldContactData,
      ...contactData,
      client: client

    }
  )

  const returnContact: TContact = contactSchema.parse(updatedContact)

  return returnContact

}