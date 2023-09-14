import { NextFunction, Request, RequestHandler, Response } from "express";
import { Repository } from "typeorm";
import { Client } from "../../entities/clients.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";

export const verifyClientIsDeletedMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientId: string = req.params.id
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)
  const client = await clientRepository.findOne(
    {
      where: {
        id: clientId
      }
    }
  )

  if(client?.deletedAt !== null){
    throw new AppError("User already deleted", 409)
  }

  return next()
}