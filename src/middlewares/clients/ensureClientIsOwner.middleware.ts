import { NextFunction, Request, RequestHandler, Response } from "express";
import { AppError } from "../../errors/AppError";

export const ensureClientIsOwnerMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientTokenId: string = res.locals.clientTokenId
  const clientParamsId: string = res.locals.clientId

  if (clientTokenId !== clientParamsId) {
    throw new AppError("Insufficient permission", 403)
  }

  return next()  
}