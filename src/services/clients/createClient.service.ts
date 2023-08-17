import { Repository } from "typeorm";
import { TClientRequest, TClientResponse } from "../../interfaces/clients.interfaces";
import { Client } from "../../entities/clients.entity";
import { AppDataSource } from "../../data-source";
import { clientSchemaResponse } from "../../schemas/clients.schemas";

export const createClientService = async (
  clientData: TClientRequest
): Promise<TClientResponse> => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

  const client: Client = clientRepository.create(clientData)
  await clientRepository.save(client)

  const returnClient: TClientResponse = clientSchemaResponse.parse(client)

  return returnClient
}