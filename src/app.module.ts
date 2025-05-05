import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { EnvConfiguration, JoiValidation } from './core/config';

import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';

// Módulos reorganizados
import { PersonModule } from './modules/person/person.module';
import { CommercialModule } from './modules/commercial/commercial.module';
import { ContractsModule } from './modules/contracts/contracts.module';
import { PoliciesModule } from './modules/policies/policies.module';
import { InsurersModule } from './modules/insurers/insurers.module';
import { FilesModule } from './modules/files/files.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
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
    CacheModule.register(),
    CommonModule,
    FilesModule,
    AuthModule,
    LocationModule,
    // Módulos reorganizados
    PersonModule, // Personas físicas y jurídicas (incluyendo empresas)
    CommercialModule, // Estructura comercial (agentes, agencias y jerarquías)
    ContractsModule, // Contratos y niveles de contrato
    PoliciesModule, // Pólizas, productos, planes y ramos
    InsurersModule, // Aseguradoras
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
