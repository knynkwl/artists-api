import nodemailer from "nodemailer";

export const sendMailTransporter = async ({
  to, 
  subject, 
  html
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  let mailOptions = ({
    from:  process.env.MAIL_USER,
    to,
    subject,
    html
  })

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  return await transporter.sendMail(mailOptions) 
}