import { Repository } from "typeorm"
import { Contact } from "../../entities/contacts.entity"
import { AppDataSource } from "../../data-source"

export const deleteContactsService = async (contactId: string): Promise<void> => {
   const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

   const contact: Contact | null = await contactRepository.findOneOrFail(
    {
      where: {
        id: contactId
      }
    }
   )
   await contactRepository.remove(contact)
}