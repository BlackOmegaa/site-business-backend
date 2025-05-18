import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendDevisConfirmation(email: string, nom: string, prestation: string, message: string, preference: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Confirmation de réception de votre devis',
            template: './devis-confirmation',
            context: {
                nom, preference, prestation, message
            },
        });
    }
}
