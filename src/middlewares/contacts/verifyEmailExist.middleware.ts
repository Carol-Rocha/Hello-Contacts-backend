import { NextFunction, Request, RequestHandler, Response } from "express";
import { Repository } from "typeorm";
import { Contact } from "../../entities/contacts.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";

export const verifyContactEmailExistMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contactEmail: string = req.body.email
  const {clientTokenId} = res.locals

  if (!contactEmail) {
    return next()
  }

  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)
  const contact = await contactRepository.exist(
    {
      where: {email: contactEmail}
    }
  )

  if (contact) {
    throw new AppError("Email already")
  }
}