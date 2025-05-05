import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from '../schemas/user.schema';

// Extend Express Request interface to include user property
declare module 'express' {
  interface Request {
    user?: User;
  }
}

/**
 * Decorador para acceder al usuario autenticado en los controladores
 *
 * Este decorador permite obtener el usuario completo o propiedades específicas
 * del usuario autenticado en los endpoints protegidos.
 *
 * @param data Nombre de la propiedad del usuario que se desea obtener.
 * Si no se especifica, se devuelve el objeto completo del usuario.
 *
 * @example
 * // Obtener el usuario completo
 * @Get('profile')
 * @Auth()
 * getProfile(@GetUser() user: User) {
 *   return user;
 * }
 *
 * @example
 * // Obtener solo el ID del usuario
 * @Get('user-id')
 * @Auth()
 * getUserId(@GetUser('id') userId: string) {
 *   return { userId };
 * }
 *
 * @throws {InternalServerErrorException} Si no se encuentra el usuario en la solicitud
 */
export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user)
      throw new InternalServerErrorException('User not found in request');

    return !data ? user : data in user ? user[data as keyof User] : undefined;
  },
);
