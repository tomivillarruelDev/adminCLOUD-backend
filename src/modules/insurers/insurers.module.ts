import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Importar controladores
import { InsurerController } from './controllers/insurer.controller';

// Importar servicios
import { InsurerService } from './services/insurer.service';

// Importar schemas
import { Insurer, InsurerSchema } from './schemas/insurer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Insurer.name, schema: InsurerSchema },
    ]),
  ],
  controllers: [InsurerController],
  providers: [InsurerService],
  exports: [InsurerService],
})
export class InsurersModule {}
