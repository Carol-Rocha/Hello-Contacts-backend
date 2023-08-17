import { NextFunction, Request, RequestHandler, Response } from "express";
import { Repository } from "typeorm";
import { Client } from "../../entities/clients.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";

export const verifyEmailExistMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientEmail: string = req.body.email

  if(!clientEmail){
    return next()
  }

  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)
  const client = await clientRepository.exist(
    {
      where: {email: clientEmail}
    }
  )
  
  if(client){
    throw new AppError("Email already exists", 409)
  }

  return next()
}