import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RealPerson, RealPersonSchema } from './schemas/real-person.schema';
import { RealPersonController } from './controllers/real-person.controller';
import { RealPersonService } from './services/real-person.service';
import { CommonModule } from '../common/common.module';

/**
 * Módulo específico para persona física (real-person)
 * Proporciona la funcionalidad CRUD y validaciones para personas físicas
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RealPerson.name, schema: RealPersonSchema },
    ]),
    CommonModule,
  ],
  controllers: [RealPersonController],
  providers: [RealPersonService],
  exports: [RealPersonService],
})
export class RealPersonModule {}
