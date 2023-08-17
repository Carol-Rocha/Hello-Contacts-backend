import { Repository } from "typeorm";
import { TClientResponse, TClientUpdateRequest } from "../../interfaces/clients.interfaces";
import { Client } from "../../entities/clients.entity";
import { AppDataSource } from "../../data-source";
import { clientSchemaResponse } from "../../schemas/clients.schemas";

export const updateClientService = async (
  clientData: TClientUpdateRequest,
  clientId: string
): Promise<TClientResponse> => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)
  const oldClientData: Client | null = await clientRepository.findOne(
    {
      where: { id: clientId }
    }
  )

  const updatedClient: Client = await clientRepository.save(
    {
      ...oldClientData,
      ...clientData
    }
  )

  const returnClient: TClientResponse = clientSchemaResponse.parse(updatedClient)

  return returnClient 
}