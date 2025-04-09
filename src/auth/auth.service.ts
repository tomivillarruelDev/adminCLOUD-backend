/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const { email, password, fullName } = registerDto;

      // Crear el usuario
      const user = await this.userModel.create({
        email: email.toLowerCase(),
        password,
        fullName,
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

  logout(userId: string) {
    // En un sistema JWT puro, el logout se maneja del lado del cliente
    // eliminando el token almacenado

    return {
      success: true,
      message: 'Session successfully closed',
    };
  }
  
  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

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
