import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidRoles } from '../interfaces/valid-roles.enum';
import { UserRoleGuard } from '../guards/role-guard/role-guard.guard';
import { RoleProtected } from './role-protected.decorator';

/**
 * Decorador compuesto para proteger rutas con autenticación y control de roles
 *
 * Este decorador aplica la protección JWT y verificación de roles en una sola llamada,
 * lo que simplifica la implementación de la seguridad en los controladores.
 *
 * @param roles Roles permitidos para acceder a la ruta. Si no se especifican roles,
 * solo se requiere que el usuario esté autenticado.
 *
 * @example
 * // Ruta que requiere autenticación sin roles específicos
 * @Auth()
 * @Get('profile')
 * getProfile() {
 *   // ...
 * }
 *
 * @example
 * // Ruta que requiere autenticación y rol de administrador
 * @Auth(ValidRoles.admin)
 * @Post('admin-only')
 * adminAction() {
 *   // ...
 * }
 *
 * @returns Decorador compuesto que aplica la protección de roles y autenticación
 */
export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
