import { Request, Response } from 'express'
import prismaClient from '../../prismaClient'

const handleTolkienVerify = async (req: Request, res: Response) => {
  const { id, tolkien } = req.params

  try {
    const user = await prismaClient.api_users.findUnique({
      where: {
        id
      }
    })

    if (!user || !user.email) {
      return res.status(400).json({
        error: 'User not found'
      })
    }

    if (user?.verifyTolkien !== tolkien) {
      return res.status(400).json({ 
        error: 'Token not valid or expired. Please request a new one.'
      })
    }
    
    await prismaClient.api_users.update({
      where: {
        id
      },
      data: {
        verified: true,
        verifyTolkien: null
      }
    })

    return res.json({
      message: 'User verified successfully.',
      success: true,
      email: user.email
    })
  } catch (error) {
    res.status(400)

    if (error instanceof Error) {
      res.json({error: error.message})
    } else {
      res.json({error: 'An error occurred'})
    }

    return;
  }
}

export default handleTolkienVerify;