import { FindManyOptions, ILike, Repository } from 'typeorm'
import { TContact } from '../../interfaces/contacts.interfaces'
import { Contact } from '../../entities/contacts.entity'
import { AppDataSource } from '../../data-source'
import { Client } from '../../entities/clients.entity'

type TContactPagination = {
  previousPage: number | null
  currentPage: number
  nextPage: number | null
  totalPages: number
  contacts: TContact[]
}

export const listContactsSerivce = async (
  clientId: string,
  searchTerm: string,
  page: number,
  pageSize: number,
  filter: string
): Promise<TContactPagination> => {
  const contactsRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact)
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client)

  const client: Client | null = await clientRepository.findOneOrFail({
    where: { id: clientId }
  })

  const queryContacts = contactsRepository
    .createQueryBuilder('contact')
    .leftJoin('contact.client', 'client')
    .where('client.id = :clientId', { clientId: client.id })

  if (filter === 'a-z') {
    queryContacts.orderBy('contact.full_name', 'ASC')
  } else if (filter === 'z-a') {
    queryContacts.orderBy('contact.full_name', 'DESC')
  }

  if (searchTerm) {
    queryContacts.andWhere(
      '(LOWER(contact.full_name) LIKE :searchTerm OR LOWER(contact.email) LIKE :searchTerm OR LOWER(contact.telephone) LIKE :searchTerm)',
      { searchTerm: `%${searchTerm.toLowerCase()}%` }
    )
  }

  const totalContacts = await queryContacts.getCount()
  const totalPages = Math.ceil(totalContacts / pageSize)

  const contacts = await queryContacts
    .take(pageSize)
    .skip((page - 1) * pageSize)
    .getMany()

  let currentPage = page
  let previousPage = currentPage > 1 ? currentPage - 1 : null
  let nextPage = currentPage < totalPages ? currentPage + 1 : null

  return {
    previousPage,
    currentPage,
    nextPage,
    totalPages,
    contacts
  }
}
