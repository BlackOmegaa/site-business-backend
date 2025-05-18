import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://charming-paletas-838342.netlify.app',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
