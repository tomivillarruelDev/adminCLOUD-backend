import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/company.schema';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';
import { CommonModule } from '../../common/common.module';

/**
 * Módulo para gestión de empresas
 * Proporciona la funcionalidad CRUD para empresas
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    CommonModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
