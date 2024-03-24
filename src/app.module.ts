import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InvoicesModule } from './services/invoices/invoice.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('SEQUELIZE_HOST'),
        port: configService.get('SEQUELIZE_PORT'),
        username: configService.get('SEQUELIZE_USERNAME'),
        password: configService.get('SEQUELIZE_PASSWORD'),
        database: configService.get('SEQUELIZE_DATABASE'),
        entities: [__dirname + '/services/**/*.entity{.ts,.js}'],
        logging: ['log', 'info', 'warn', 'error'],
        maxQueryExecutionTime: 3000,
        timezone: 'Z',
      }),
    }),
    InvoicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
