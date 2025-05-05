import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PERSON_VALIDATOR } from './interfaces';
import { PersonValidatorService } from './services';
import {
  RealPerson,
  RealPersonSchema,
} from '../real-person/schemas/real-person.schema';
import {
  LegalPerson,
  LegalPersonSchema,
} from '../legal-person/schemas/legal-person.schema';

/**
 * Módulo que centraliza componentes comunes entre los submódulos de person
 * Aquí se incluyen interfaces, servicios, enums y DTOs reutilizables
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RealPerson.name, schema: RealPersonSchema },
      { name: LegalPerson.name, schema: LegalPersonSchema },
    ]),
  ],
  providers: [
    // Registramos PersonValidatorService usando el token
    {
      provide: PERSON_VALIDATOR,
      useClass: PersonValidatorService,
    },
    PersonValidatorService,
  ],
  exports: [
    // Exportamos el token para que pueda ser utilizado por otros módulos
    {
      provide: PERSON_VALIDATOR,
      useClass: PersonValidatorService,
    },
    PersonValidatorService,
    MongooseModule, // Exportamos MongooseModule para que los modelos estén disponibles para otros módulos
  ],
})
export class CommonModule {}
