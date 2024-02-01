import 'dotenv/config';
import Queue from 'bull';
import nodemailer from 'nodemailer';

const emailQueue = new Queue('emails', process.env.REDIS_URL);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

emailQueue.process(async (job) => {
  const email = job.data;
  try {
    await transporter.sendMail(email);
  } catch (error) {
    // handle error
  }
});

const emails = [
  {
    from: `Stas <${process.env.EMAIL}>`,
    to: 'recipient1@example.com',
    subject: 'Email 1',
    text: 'This is the message for email 1.',
  },
  {
    from: `Stas <${process.env.EMAIL}>`,
    to: 'recipient2@example.com',
    subject: 'Email 2',
    text: 'This is the message for email 2.',
  },
  // ...
];

emails.forEach((email) => {
  emailQueue.add(email);
});
