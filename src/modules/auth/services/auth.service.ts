/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto, LoginDto } from '../dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces';

/**
 * Servicio de autenticación
 * Gestiona el registro, inicio de sesión, actualización y cierre de sesión de usuarios
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registra un nuevo usuario en el sistema
   * @param registerDto Datos del usuario a registrar
   * @returns Datos del usuario creado y token de acceso
   * @throws BadRequestException Si el usuario ya existe
   * @throws InternalServerErrorException Si ocurre un error al crear el usuario
   */
  async register(registerDto: RegisterDto) {
    try {
      const { email, password } = registerDto;

      // Crear el usuario
      const user = await this.userModel.create({
        email: email.toLowerCase(),
        password,
      });

      // Eliminar la contraseña del objeto de respuesta
      const { password: _, ...userWithoutPassword } = user.toJSON();

      return {
        ...userWithoutPassword,
        token: this.getJwtToken({ id: user.id, email: user.email }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  /**
   * Autentica un usuario con sus credenciales
   * @param loginDto Credenciales de inicio de sesión (email y contraseña)
   * @returns Datos del usuario autenticado y token de acceso
   * @throws UnauthorizedException Si las credenciales son inválidas
   * @throws InternalServerErrorException Si ocurre un error en la validación
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Usamos .findOne().exec() para asegurar que obtenemos un documento completo de Mongoose
    const user = await this.userModel
      .findOne({ email: email.toLowerCase() })
      .exec();

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verificamos que el método existe antes de llamarlo
    if (!user.comparePassword) {
      throw new InternalServerErrorException('Error in credentials validation');
    }

    if (!(await user.comparePassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user.toJSON();

    return {
      ...userWithoutPassword,
      token: this.getJwtToken({ id: user.id, email: user.email }),
    };
  }

  /**
   * Actualiza el token de acceso de un usuario
   * @param userId ID del usuario para renovar el token
   * @returns Datos del usuario y nuevo token de acceso
   * @throws UnauthorizedException Si el usuario no existe
   */
  async refreshToken(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password: _, ...userWithoutPassword } = user.toJSON();

    return {
      ...userWithoutPassword,
      token: this.getJwtToken({ id: user.id, email: user.email }),
    };
  }

  /**
   * Cierra la sesión de un usuario
   * @param userId ID del usuario para cerrar sesión
   * @returns Mensaje de confirmación de cierre de sesión
   * @remarks En un sistema JWT puro, el logout se maneja del lado del cliente eliminando el token almacenado
   */
  logout(userId: string) {
    // En un sistema JWT puro, el logout se maneja del lado del cliente
    // eliminando el token almacenado

    return {
      success: true,
      message: 'Session successfully closed',
    };
  }

  /**
   * Genera un token JWT con la información del usuario
   * @param payload Datos a incluir en el token (ID y email del usuario)
   * @returns Token JWT firmado
   * @private
   */
  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  /**
   * Maneja los errores de base de datos
   * @param error Error de la base de datos
   * @throws BadRequestException Si el usuario ya existe (error de duplicado)
   * @throws InternalServerErrorException Para otros errores
   * @private
   */
  private handleDBErrors(error: any): never {
    if (error.code === 11000) {
      throw new BadRequestException(
        `User already exists: ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.error(error);
    throw new InternalServerErrorException(
      'Error creating user - Check server logs',
    );
  }
}
