
import { Request, Response } from 'express';
import { sendMailTransporter } from "../../transporters/mailer";
import prismaClient from '../../prismaClient';
import crypto from 'crypto';

const handleTolkienResend = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await prismaClient.api_users.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      res.status(400).json({ error: 'User not found' });
      return;
    }

    if(user.verified) {
      res.status(400).json({ error: 'User already verified' });
      return;
    }

    const verifyTolkien = crypto.randomBytes(32).toString('hex');

    const userWithTolkien = await prismaClient.api_users.update({
      where: {
        id: user.id
      },
      data: {
        verifyTolkien: verifyTolkien,
        verified: false
      }
    });

    // ${process.env.APP_BASE_URL}/api/user/verify/${userWithTolkien.id}/${userWithTolkien.verifyTolkien}
    await sendMailTransporter({
      to: email,
      subject: 'Account Verification Link',
      html: `<p>
        Click this link to verify your email: <a href="${process.env.APP_BASE_URL}/verify?id=${userWithTolkien.id}&token=${userWithTolkien.verifyTolkien}">Verify Email</a>
      </p>`
    });

    res.json({ 
      message: 'Verification email sent, please check your email.',
      success: true
    });
    return;
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during tolkien resend' });
    return;
  }
}

export default handleTolkienResend;