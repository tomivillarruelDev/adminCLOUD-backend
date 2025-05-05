import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Agent extends Document {
  @ApiProperty({
    description: 'Nombre del agente',
    example: 'Juan Pérez',
    required: true,
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del agente',
    example: 'juan.perez@example.com',
    required: false,
  })
  @Prop()
  email: string;

  @ApiProperty({
    description: 'Número de teléfono del agente',
    example: '+34123456789',
    required: false,
  })
  @Prop()
  phone: string;

  @ApiProperty({
    description: 'ID de la agencia a la que pertenece el agente',
    example: '507f1f77bcf86cd799439011',
    required: true,
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Agency', required: true })
  agencyId: MongooseSchema.Types.ObjectId;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);
