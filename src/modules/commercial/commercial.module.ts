import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Importar controladores
import { AgencyController } from './controllers/agency.controller';
import { CommercialStructureController } from './controllers/commercial-structure.controller';

// Importar servicios
import { AgencyService } from './services/agency.service';
import { CommercialStructureService } from './services/commercial-structure.service';

// Importar schemas
import { Agency, AgencySchema } from './schemas/agency.schema';
import {
  CommercialStructure,
  CommercialStructureSchema,
} from './schemas/commercial-structure.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Agency.name, schema: AgencySchema },
      { name: CommercialStructure.name, schema: CommercialStructureSchema },
    ]),
  ],
  controllers: [AgencyController, CommercialStructureController],
  providers: [AgencyService, CommercialStructureService],
  exports: [AgencyService, CommercialStructureService],
})
export class CommercialModule {}
