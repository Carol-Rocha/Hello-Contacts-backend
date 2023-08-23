import { Repository } from "typeorm";
import { TContact } from "../../interfaces/contacts.interfaces";
import { Contact } from "../../entities/contacts.entity";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";

export const listContactsSerivce = async (clientId: string ): Promise<TContact[]> => {
  const contactsRepository: Repository<Contact> = AppDataSource.getRepository(Contact)
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)
  const client: Client | null = await clientRepository.findOneOrFail({where: {id: clientId}})

  const contacs = await contactsRepository.find(
    {
      where: {
        client:{
          id: client.id
        }
      }
    }
  )
  return contacs
}