import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

/**
 * Esquema de usuario para autenticación y gestión de usuarios
 */
@Schema({
  timestamps: true, // Añade createdAt y updatedAt automáticamente
})
export class User {
  /**
   * Nombre del usuario
   */
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
  })
  @Prop({
    required: true,
  })
  name: string;

  /**
   * Apellido del usuario
   */
  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Pérez',
  })
  @Prop({
    required: true,
  })
  lastname: string;

  /**
   * Género del usuario
   */
  @ApiProperty({
    description: 'Género del usuario',
    example: 'Masculino',
  })
  @Prop({
    required: true,
  })
  gender: string;

  /**
   * Correo electrónico único del usuario
   */
  @ApiProperty({
    description: 'Correo electrónico único del usuario',
    example: 'usuario@ejemplo.com',
  })
  @Prop({
    unique: true,
    required: true,
    index: true,
  })
  email: string;

  /**
   * Jerarquía del usuario en el sistema
   */
  @ApiProperty({
    description: 'Jerarquía del usuario en el sistema',
    example: 'Administrador',
  })
  @Prop({
    required: true,
  })
  hierarchy: string;

  /**
   * Nombre de usuario único para iniciar sesión
   */
  @ApiProperty({
    description: 'Nombre de usuario único para iniciar sesión',
    example: 'juanperez',
  })
  @Prop({
    unique: true,
    required: true,
    index: true,
  })
  user: string;

  /**
   * Contraseña del usuario (hasheada)
   * No se muestra en las respuestas de la API
   */
  @Prop({
    required: true,
  })
  password: string;

  /**
   * Indica si el usuario está activo en el sistema
   */
  @ApiProperty({
    description: 'Indica si el usuario está activo en el sistema',
    example: true,
  })
  @Prop({
    default: true,
  })
  isActive: boolean;

  /**
   * Roles asignados al usuario para control de acceso
   */
  @ApiProperty({
    description: 'Roles asignados al usuario para control de acceso',
    example: ['user'],
  })
  @Prop({
    type: [String],
    default: ['user'],
  })
  roles: string[];

  /**
   * Estado de conexión del usuario
   */
  @ApiProperty({
    description: 'Estado de conexión del usuario',
    example: 'offline',
    enum: ['online', 'busy', 'offline'],
  })
  @Prop({
    type: String,
    enum: ['online', 'busy', 'offline'],
    default: 'offline',
  })
  status: string;

  /**
   * Fecha y hora de la última actividad del usuario
   */
  @ApiProperty({
    description: 'Fecha y hora de la última actividad del usuario',
    example: null,
  })
  @Prop({
    type: Date,
    default: null,
  })
  lastActiveAt: Date;

  /**
   * Método para comparar contraseñas
   * @param password Contraseña sin hashear para comparar
   * @returns Verdadero si la contraseña coincide, falso en caso contrario
   */
  async comparePassword(password: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

// Middleware pre-save para hashear la contraseña antes de guardarla
UserSchema.pre('save', async function (next) {
  const user = this as UserDocument;

  // Solo hashear la contraseña si ha sido modificada o es nueva
  if (!user.isModified('password')) return next();

  // Generar un salt y hashear la contraseña
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  next();
});

// Añadir el método comparePassword al esquema
UserSchema.methods.comparePassword = async function (
  this: UserDocument,
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};
