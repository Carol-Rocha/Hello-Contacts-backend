import { Repository } from 'typeorm'
import {
  TLoginRequest,
  TLoginResponse
} from '../../interfaces/login.interfaces'
import { Client } from '../../entities/clients.entity'
import { AppDataSource } from '../../data-source'
import { AppError } from '../../errors/AppError'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const createTokenService = async (
  loginData: TLoginRequest
): Promise<TLoginResponse> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client)
  const client: Client | null = await clientRepository.findOne({
    where: {
      email: loginData.email
    }
  })

  if (!client) {
    throw new AppError('Invalid credentials', 401)
  }

  const passwordMatch = await compare(loginData.password, client.password)

  if (!passwordMatch) {
    throw new AppError('Invalid credentials', 401)
  }

  const id: string = client.id

  const token = jwt.sign(
    { clientId: client.id },
    String(process.env.SECRET_KEY),
    {
      expiresIn: '24h',
      subject: client.id
    }
  )

  const loginResponse = {
    token: token,
    id: id
  }

  return loginResponse
}
