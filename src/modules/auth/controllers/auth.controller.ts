import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto } from '../dto';
import { Auth, GetUser } from '../decorators';
import { User } from '../schemas/user.schema';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

/**
 * Controlador para la gestión de autenticación de usuarios
 * Maneja el registro, inicio de sesión, actualización de tokens y cierre de sesión
 */
@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registra un nuevo usuario en el sistema
   * @param registerDto Datos necesarios para el registro
   * @returns Datos del usuario registrado con token de acceso
   */
  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: 409,
    description: 'El correo electrónico ya está registrado',
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Inicia sesión con un usuario existente
   * @param loginDto Credenciales de inicio de sesión
   * @returns Token de acceso y token de actualización
   */
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales incorrectas',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Actualiza el token de acceso usando el ID del usuario
   * @param userId ID del usuario para actualizar el token
   * @returns Nuevo token de acceso
   */
  @Auth()
  @Get('refresh')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar token de acceso' })
  @ApiResponse({
    status: 200,
    description: 'Token actualizado correctamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async refreshToken(@GetUser('id') userId: string) {
    return await this.authService.refreshToken(userId);
  }

  /**
   * Cierra la sesión del usuario
   * @param userId ID del usuario que cierra sesión
   * @returns Mensaje de confirmación
   */
  @Auth()
  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cerrar sesión' })
  @ApiResponse({
    status: 200,
    description: 'Sesión cerrada correctamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  logout(@GetUser('id') userId: string) {
    return this.authService.logout(userId);
  }

  /**
   * Ruta privada de prueba para verificar autenticación
   * @param user Usuario autenticado
   * @returns Detalles del usuario y mensaje de confirmación
   */
  @Get('private')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ruta privada de prueba' })
  @ApiResponse({
    status: 200,
    description: 'Acceso autorizado a ruta privada',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  testingPrivateRoute(
    @GetUser()
    user: User,
  ) {
    return {
      ok: true,
      message: 'Hello world from private route',
      user,
    };
  }
}
