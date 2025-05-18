import { Module } from '@nestjs/common';
import { DevisController } from './devis.controller';
import { DevisService } from './devis.service';
import { MailModule } from '../mail/mail.module'; // 👈 à importer


@Module({
    imports: [MailModule],
    controllers: [DevisController],
    providers: [DevisService],
})
export class DevisModule { }
