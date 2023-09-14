import { Repository } from "typeorm";
import { TContact, TContactRequest } from "../../interfaces/contacts.interfaces";
import { Contact } from "../../entities/contacts.entity";
import { AppDataSource } from "../../data-source";
import { contactSchema } from "../../schemas/contacts.schemas";
import { Client } from "../../entities/clients.entity";

export const createContactsService = async (
  contactData: TContactRequest,
  clientId: string
): Promise<TContact> => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)
  const client: Client | null = await clientRepository.findOneOrFail({ where: { id: clientId }})

  const contact = contactRepository.create({
    ...contactData,
    client: client
  })
  
  await contactRepository.save(contact)

  const returnContact: TContact = contactSchema.parse(contact)

  return returnContact
}