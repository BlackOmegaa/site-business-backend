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
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'blackomegadu42@gmail.com',
          pass: 'dqrd lwcl evvb yvej',
        },
      },
      defaults: {
        from: '"Society" <blackomegadu42@gmail.com>',
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
