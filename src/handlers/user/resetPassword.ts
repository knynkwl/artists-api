import { Request, Response } from 'express';
import prismaClient from '../../prismaClient';
import { createJWT, hashPassword, comparePasswords } from "../../utils/auth";

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { id, currentPassword, newPassword } = req.body;
    const user = await prismaClient.api_users.findUnique({
      where: {
        id
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const valid = await comparePasswords(req.body.password, currentPassword)

    if(!valid) {
      throw new Error('Password is not correct');
    }

    const hashedPassword = await hashPassword(newPassword);

    await prismaClient.api_users.update({
      where: {
        id
      },
      data: {
        password: hashedPassword
      }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during password set' });
  }
}

export default resetPassword;