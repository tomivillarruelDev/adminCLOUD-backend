import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({
  timestamps: true, // Añade createdAt y updatedAt automáticamente
})
export class User {
  @Prop({
    unique: true,
    required: true,
    index: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop()
  fullName: string;

  @Prop({
    default: true,
  })
  isActive: boolean;

  @Prop({
    type: [String],
    default: ['user'],
  })
  roles: string[];

  // Método para comparar contraseñas
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
