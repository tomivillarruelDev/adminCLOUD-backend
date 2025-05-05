import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './schemas/contact.schema';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from './services/contact.service';
import { CommonModule } from '../../common/common.module';

/**
 * Módulo para gestión de contactos
 * Proporciona la funcionalidad CRUD para contactos
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
    CommonModule,
  ],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
