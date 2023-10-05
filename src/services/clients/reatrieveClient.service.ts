import { Repository } from 'typeorm'
import { Client } from '../../entities/clients.entity'
import { AppDataSource } from '../../data-source'
import { TClientResponse } from '../../interfaces/clients.interfaces'
import { clientSchemaResponse } from '../../schemas/clients.schemas'

export const retrieveClientService = async (clientId: string) => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client)

  const client: Client | null = await clientRepository.findOne({
    where: {
      id: clientId
    }
  })
  const returnClient: TClientResponse = clientSchemaResponse.parse(client)

  return returnClient
}
