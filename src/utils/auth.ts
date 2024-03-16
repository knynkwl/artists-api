import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '@/types/index'
import logger from './logger'

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5)
}

export const createJWT = (user: User) => {
  const token = jwt.sign({
      id: user.id,
      username: user.username
    }, 
    process.env.JWT_SECRET as string
  )
  return token
}

interface CustomRequest extends Request {
  user?: any; 
}

export const protect = (req: CustomRequest, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    res.status(401)
    res.json({message: 'not authorized'})
    return
  }

  const [, token] = bearer.split(' ')

  if (!token) {
    res.status(401)
    res.json({message: 'not valid token'})
    return
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string)
    console.log(user);
    req.user = user
    next()
  } catch (e) {
    console.error(e)
    res.status(401)
    logger.error('not valid token')
    res.json({message: 'not valid token'})
    return
  }
}