import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ExceptionsFilter } from './exception.filter';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get(ConfigService);

  app.useGlobalFilters(new ExceptionsFilter());
  app.setGlobalPrefix('api');
  app.use(morgan('tiny'));

  await app.listen(config.get('APP_PORT'));
}
bootstrap();
