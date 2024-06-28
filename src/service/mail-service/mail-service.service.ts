import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import {
  getMailTemplate,
} from 'src/templates/mail-templates';

@Injectable()
export class MailService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('EMAIL_ID'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    const info = await this.transporter.sendMail({
      to,
      subject,
      html,
    });
    return info;
  }

  getMailTemplate(
    templateName: string,
    placeholders: Record<string, string>,
  ): string {
    return getMailTemplate(templateName, placeholders);
  }
}
