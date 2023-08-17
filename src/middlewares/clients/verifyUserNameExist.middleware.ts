import { NextFunction, Request, RequestHandler, Response } from "express"
import { Repository } from "typeorm"
import { Client } from "../../entities/clients.entity"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors/AppError"


export const verifyUserNameExistMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userName: string = req.body.user_name

  if(!userName){
    return next()
  }

  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)
  const client = await clientRepository.exist(
    {
      where: {user_name: userName}
    }
  )
  
  if(client){
    throw new AppError("Username already exists", 409)
  }

  return next()
}