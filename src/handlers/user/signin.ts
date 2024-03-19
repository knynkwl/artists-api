import { Request, Response } from 'express'
import prismaClient from '../../prismaClient'
import { comparePasswords, createJWT } from '../../utils/auth'

interface SignInRequest extends Request {
  body: {
    email: string
    password: string
  }
}

const handleSignin = async (req: SignInRequest, res: Response) => {
  try {
    const user = await prismaClient.api_users.findUnique({
      where: {
        email: req.body.email
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    if(!user.password) {
      throw new Error('Password not set. Please request a new one.')
    }

    const valid = await comparePasswords(req.body.password, user.password)

    if (!valid) {
      throw new Error('password not valid')
    }

    const token = createJWT(user)
    res.json({token})

  } catch (error) {
    res.status(400)

    if (error instanceof Error) {
      res.json({error: error.message})
    } else {
      res.json({error: 'An error occurred'})
    }
  }
}

export default handleSignin;