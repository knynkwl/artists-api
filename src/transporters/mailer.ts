import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY as string,
    domain: 'sarasotachalkfestival.org'
  }
}

export const sendMailTransporter = async ({
  to, 
  subject, 
  html
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const nodemailerMailgun = nodemailer.createTransport(mg(auth));

  let mailOptions = {
    from:  process.env.MAIL_USER,
    to,
    subject,
    html
  }

  return await nodemailerMailgun.sendMail(mailOptions);
}