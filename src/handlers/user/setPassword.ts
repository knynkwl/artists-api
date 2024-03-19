import { Request, Response } from 'express';
import prismaClient from '../../prismaClient';

const setPassword = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;
    const user = await prismaClient.api_users.findUnique({
      where: {
        id
      }
    });

    if (!user) {
      res.status(400).json({ error: 'User not found' });
    }

    await prismaClient.api_users.update({
      where: {
        id
      },
      data: {
        password
      }
    });
    res.json({ 
      message: 'Password set successfully',
      success: true 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'An error occurred during password set'
    });
  }
}

export default setPassword;