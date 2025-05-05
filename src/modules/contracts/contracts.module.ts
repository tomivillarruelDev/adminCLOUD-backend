import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Importar controladores
import { ContractController } from './controllers/contract.controller';
import { ContractLevelController } from './controllers/contract-level.controller';

// Importar servicios
import { ContractService } from './services/contract.service';
import { ContractLevelService } from './services/contract-level.service';

// Importar schemas
import { Contract, ContractSchema } from './schemas/contract.schema';
import {
  ContractLevel,
  ContractLevelSchema,
} from './schemas/contract-level.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contract.name, schema: ContractSchema },
      { name: ContractLevel.name, schema: ContractLevelSchema },
    ]),
  ],
  controllers: [ContractController, ContractLevelController],
  providers: [ContractService, ContractLevelService],
  exports: [ContractService, ContractLevelService],
})
export class ContractsModule {}
