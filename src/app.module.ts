import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { MetricsModule } from './metrics/metrics.module';
import { DevisModule } from './devis/devis.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';


@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true,
        auth: {
          user: 'support@nuvity.net',
          pass: 'Beyblade2001@@',
        },
      },
      defaults: {
        from: '"Nuvity" <support@nuvity.net>',
      },
      template: {
        dir: join(process.cwd(), "templates"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, AdminModule, MetricsModule, DevisModule
  ],
})

export class AppModule { }
