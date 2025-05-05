import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Importar módulos principales
import { RealPersonModule } from './real-person/real-person.module';
import { LegalPersonModule } from './legal-person/legal-person.module';
import { CommonModule } from './common/common.module';

// Importar submódulos
import { AgentModule } from './submodules/agent/agent.module';
import { CompanyModule } from './submodules/company/company.module';
import { ContactModule } from './submodules/contact/contact.module';

/**
 * Módulo principal de personas
 * Centraliza la funcionalidad relacionada con personas físicas, jurídicas
 * y sus subtipos (agentes, contactos, empresas)
 */
@Module({
  imports: [
    CommonModule,
    RealPersonModule,
    LegalPersonModule,
    AgentModule,
    CompanyModule,
    ContactModule,
  ],
  exports: [
    CommonModule,
    RealPersonModule,
    LegalPersonModule,
    AgentModule,
    CompanyModule,
    ContactModule,
  ],
})
export class PersonModule {}
