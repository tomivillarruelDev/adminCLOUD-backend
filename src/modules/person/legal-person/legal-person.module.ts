import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LegalPerson, LegalPersonSchema } from './schemas/legal-person.schema';
import { LegalPersonController } from './controllers/legal-person.controller';
import { LegalPersonService } from './services/legal-person.service';
import { CommonModule } from '../common/common.module';

/**
 * Módulo específico para persona jurídica (legal-person)
 * Proporciona la funcionalidad CRUD y validaciones para personas jurídicas
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LegalPerson.name, schema: LegalPersonSchema },
    ]),
    CommonModule,
  ],
  controllers: [LegalPersonController],
  providers: [LegalPersonService],
  exports: [LegalPersonService],
})
export class LegalPersonModule {}
