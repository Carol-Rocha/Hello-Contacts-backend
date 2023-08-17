import { NextFunction, Request, RequestHandler, Response } from "express";
import { Repository } from "typeorm";
import { Client } from "../../entities/clients.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";

export const ensureClientExistMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientId: string = req.body.id

  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)
  const client = await clientRepository.findOne({
    where: {
      id: clientId
    }
  })

  if(!client){
    throw new AppError("User not found", 404)
  }

  res.locals.clientId = clientId

  return next()

}