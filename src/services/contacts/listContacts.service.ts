import { Repository } from 'typeorm'
import { TContact } from '../../interfaces/contacts.interfaces'
import { Contact } from '../../entities/contacts.entity'
import { AppDataSource } from '../../data-source'
import { Client } from '../../entities/clients.entity'

export const listContactsSerivce = async (
  clientId: string,
  searchTerm: string
): Promise<TContact[]> => {
  const contactsRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact)
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client)
  const client: Client | null = await clientRepository.findOneOrFail({
    where: { id: clientId }
  })

  const contacts = await contactsRepository.find({
    where: {
      client: {
        id: client.id
      }
    }
  })

  if (!searchTerm) {
    return contacts
  }

  const normalizedSearchTerm = searchTerm.toLowerCase()

  return contacts.filter((contact: TContact) => {
    const { full_name, email, telephone } = contact

    return (
      full_name.toLowerCase().includes(normalizedSearchTerm) ||
      email.toLowerCase().includes(normalizedSearchTerm) ||
      telephone.toLowerCase().includes(normalizedSearchTerm)
    )
  })
}
