import jwt from "jsonwebtoken"
import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import { AppError } from "../../errors/AppError"

export const ensureTokenIsValidMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined = req.headers.authorization

  if (!token) {
    throw new AppError("Missing bearer token", 401)
  } 

  token = token.split(" ")[1]

  jwt.verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
    if (error) throw new AppError(error.message, 401)

    res.locals.clientTokenId = decoded.clientId
    
    return next()
  })
}