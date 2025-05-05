import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para el registro de nuevos usuarios
 */
export class RegisterDto {
  /**
   * Nombre del usuario
   * @example "Juan"
   */
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  name: string;

  /**
   * Apellido del usuario
   * @example "Pérez"
   */
  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Pérez',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  lastname: string;

  /**
   * Género del usuario
   * @example "Masculino"
   */
  @ApiProperty({
    description: 'Género del usuario',
    example: 'Masculino',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  gender: string;

  /**
   * Correo electrónico del usuario
   * @example "usuario@ejemplo.com"
   */
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'usuario@ejemplo.com',
  })
  @IsString()
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  @Matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, {
    message: 'The email must be a valid email address',
  })
  email: string;

  /**
   * Jerarquía del usuario en el sistema
   * @example "Administrador"
   */
  @ApiProperty({
    description: 'Jerarquía del usuario en el sistema',
    example: 'Administrador',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  hierarchy: string;

  /**
   * Nombre de usuario para iniciar sesión
   * @example "juanperez"
   */
  @ApiProperty({
    description: 'Nombre de usuario para iniciar sesión',
    example: 'juanperez',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  user: string;

  /**
   * Contraseña del usuario
   * Debe contener al menos una letra mayúscula, una minúscula y un número
   * @example "Password123"
   */
  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Password123',
    minLength: 6,
    maxLength: 50,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}
