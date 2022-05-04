import { MailAdapter, SendMailData } from '../mailAdapter';
import nodemailer from 'nodemailer';

export class NodemailerMailAdapter implements MailAdapter {
  private readonly transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'd6956e2ce9c5e8',
      pass: '77a825ff13d08d'
    }
  });

  async sendMail({ subject, body }: SendMailData) {
    await this.transport.sendMail({
      from: 'FeedGet Team <hello@feedget.com>',
      to: 'Wendell Kenneddy <wkenneddy505@gmail.com>',
      subject: subject,
      html: body
    });
  }
}
