import { Request, Response } from 'express';
import prismaClient from '../../prismaClient';
import crypto from 'crypto';
import { sendMailTransporter } from "../../transporters/mailer";
import { hashPassword } from '../../utils/auth';

const inviteUser = async (req: Request, res: Response) => {
  try {
    const { email, assignedRole, name } = req.body;

    const foundRole = await prismaClient.api_roles.findUnique({
      where: {
        name: assignedRole
      }
    });

    if (!foundRole) {
      return res.status(400).json({ error: `The role "${foundRole}" does not exsist.` });
    }

    const verifyTolkien = crypto.randomBytes(32).toString('hex');
    const temporaryPassword = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await hashPassword(temporaryPassword);

    await prismaClient.api_users.upsert({
      where: {
        email: email,
      },
      update: {
        tmpPassword: hashedPassword
      },
      create: {
        name: name || null,
        email,
        tmpPassword: hashedPassword,
        roleId: foundRole?.id,
        verifyTolkien
      }
    })

    const sending = await sendMailTransporter({
      to: email,
      subject: 'Invitation: Sarasota Chalk Festival API',
      html: `
        <p>You've been invited to the Sarasota Chalk Festial Artists API!</p>  
        <br>
        <p>Finish signing up here: ${process.env.APP_BASE_URL}/signup</p>

        <p>
          <strong>Login info:</strong>
          <br>
          Username: <code>${email}</code>
          <br>
          Temporary password: <code style="display:inline-block;padding:4px 6px;background-color:#222;color:#FFF;">${temporaryPassword}</code>
        </p>
      `
    })

    if (!sending) {
      return res.status(500).json({ error: 'Failed to send email' })
    }

    res.json({
      message: 'User invited successfully',
      success: true
    })
  } 
  catch (error) {
    res.status(500).json({ error: 'An error occurred during user invite' })
  }
}

export default inviteUser;