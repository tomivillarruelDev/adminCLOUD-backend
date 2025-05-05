import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ discriminatorKey: 'type', _id: true })
export class Person extends Document {
  @ApiProperty({
    description: 'Nombre de la persona',
    example: 'Juan Pérez',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico de la persona',
    example: 'juan.perez@ejemplo.com',
  })
  @Prop({ required: true })
  email: string;

  @ApiProperty({
    description: 'Número de teléfono',
    example: '+5491123456789',
  })
  @Prop({ required: true })
  phone: string;

  @ApiProperty({
    description: 'Tipo de persona (real o legal)',
    example: 'real',
    enum: ['real', 'legal'],
  })
  @Prop({ required: true })
  type: string; // 'real' o 'legal'
}

export const PersonSchema = SchemaFactory.createForClass(Person);
