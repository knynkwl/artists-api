import { Request, Response } from "express";
import prismaClient from "../../prismaClient";
import { comparePasswords, createJWT, hashPassword } from "../../utils/auth";
import randomstring from 'randomstring';

const getUserRole = async (email: string) => {
  const adminEmails = process.env.ADMIN_EMAILS?.split(',');
  const userRole = await prismaClient.api_roles.findFirst({
    where: {
      name: adminEmails?.includes(email) ? 'Admin' : 'User'
    }
  })

  return userRole?.id || undefined
}

const handleSignup = async (req: Request, res: Response) => {
  try {
    const { email, name, password, tmpPassword } = req.body;
    if(!password) {
      return res.status(400).json({ error: 'Password not set' });
    }

    const user = await prismaClient.api_users.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const validTmpPass = await comparePasswords(tmpPassword, user.tmpPassword)
    if (!validTmpPass) {
      return res.status(401).json({ error: 'Temporary password not valid!' });
    }

    const hashedPassword = await hashPassword(password);
    const updatedUser = await prismaClient.api_users.update({
      where: {
        email
      },
      data: {
        name,
        tmpPassword: undefined,
        password: hashedPassword,
        verified: true
      }
    });

    if (!updatedUser) {
      return res.status(500).json({ error: 'Failed to create user' });
    }

    const token = createJWT(updatedUser);
    return res.json({ token });
  } catch (error) {
    // Log the error for debugging
    console.error('Error during signup:', error);
    return res.status(500).json({ error: 'An error occurred during signup' });
  }
};

export default handleSignup;