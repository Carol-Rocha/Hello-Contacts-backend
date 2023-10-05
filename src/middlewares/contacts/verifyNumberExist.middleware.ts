import { NextFunction, Request, RequestHandler, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Contact } from '../../entities/contacts.entity'
import { Repository } from 'typeorm'
import { AppError } from '../../errors/AppError'

export const verifyContactNumberExistMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contactNumber: string = req.body.telephone
  console.log(contactNumber)

  if (!contactNumber) {
    return next()
  }

  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact)
  const number = await contactRepository.exist({
    where: { telephone: contactNumber }
  })

  if (number) {
    throw new AppError('Telephone already exist')
  }
}
