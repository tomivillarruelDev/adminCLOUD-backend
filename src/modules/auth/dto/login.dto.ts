import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para el proceso de inicio de sesión
 */
export class LoginDto {
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
  email: string;

  /**
   * Contraseña del usuario
   * @example "Password123"
   */
  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Password123',
  })
  @IsString()
  password: string;
}
// }
// export class LoginResponseDto {
//     accessToken: string;
//     refreshToken: string;
//     }
