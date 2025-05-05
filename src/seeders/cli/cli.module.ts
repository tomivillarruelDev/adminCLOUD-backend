import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeedLocationCommand } from './commands/seed-location.command';
import { SeederModule } from '../seeder.module';
import { EnvConfiguration, JoiValidation } from '../../core/config';

@Module({
  imports: [
    CommandModule,
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidation,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGO_URI') ||
          'mongodb://root:root@localhost:27017/admin',
      }),
    }),
    SeederModule,
  ],
  providers: [SeedLocationCommand],
})
export class CliModule {}
