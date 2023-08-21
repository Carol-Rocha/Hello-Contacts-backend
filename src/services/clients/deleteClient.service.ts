import { Repository } from "typeorm"
import { Client } from "../../entities/clients.entity"
import { AppDataSource } from "../../data-source"

export const deleteClientService = async (clientId: string): Promise<void> => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

  const client: Client | null = await clientRepository.findOne(
    {
      where: {
        id: clientId
      }
    }
  )
  await clientRepository.softRemove(client!)
}