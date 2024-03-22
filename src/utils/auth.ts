import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '@/types/index'
import logger from './logger'
import prismaClient from '../prismaClient'

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5)
}

export const createJWT = (user: User) => {
  const token = jwt.sign({
    id: user.id,
    email: user.email,
  }, 
  process.env.JWT_SECRET as string,
  {
    expiresIn: '7d'
  })
  return token
}

interface CustomRequest extends Request {
  user?: any; 
}

// Generic error message for authentication
// for security reasons, we don't want to give away too much information
const customError = (customError: string) => {
  if(process.env.NODE_ENV === 'production') {
    return 'There was an error with your request. Please try again.'
  } else {
    return customError
  }
}

export const protect = (req: CustomRequest, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    res.status(401).json({message: customError('Authorization header not set or missing')})
    return
  }

  const [, token] = bearer.split(' ')

  if (!token) {
    res.status(401).json({message: customError('No token provided')})
    return
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string)

    req.user = user
    next()
  } catch (e) {
    logger.error(customError('No token provided'), e)
    res.status(401).json({message: customError('No token provided')})
    return
  }
}

export const isAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { user } = req

  if (!user) {
    return res.status(401).json({message: customError('User not in response object')})
  }
  
  const getUser = await prismaClient.api_users.findUnique({
    where: {
      id: user.id
    }
  })
  
  if (!getUser || !getUser.roleId) {
    return res.status(401).json({
      message: customError('User not found or role is not assigned.')
    })
  }

  const roleById = await prismaClient.api_roles.findUnique({
    where: {
      id: getUser.roleId
    }
  })

  if(roleById?.name !== 'Admin') {
    res.status(401).json({
      message: customError('You are not authorized to access this route')
    })
  }
  
  next()
}