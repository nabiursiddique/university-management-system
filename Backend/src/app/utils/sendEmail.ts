import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'nabiursiddique01@gmail.com',
      pass: 'gslu zpof wvde aqyu',
    },
  });

  await transporter.sendMail({
    from: 'nabiursiddique01@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within 10 minutes',
    text: 'Reset your password with this link',
    html,
  });
};
