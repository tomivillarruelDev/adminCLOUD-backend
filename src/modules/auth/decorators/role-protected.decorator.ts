import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces/valid-roles.enum';

/**
 * Clave de metadatos utilizada para almacenar los roles en los metadatos de la ruta
 */
export const META_ROLES = 'roles';

/**
 * Decorador que establece los roles necesarios para acceder a una ruta
 *
 * Este decorador es utilizado internamente por el decorador @Auth para
 * establecer los roles que tendrán permiso para acceder a la ruta protegida.
 * Los roles se almacenan como metadatos en la ruta y son verificados por el
 * guard de roles (UserRoleGuard).
 *
 * @param args Roles válidos que tendrán acceso a la ruta
 * @returns Decorador que establece los metadatos de roles en la ruta
 */
export const RoleProtected = (...args: ValidRoles[]) => {
  return SetMetadata(META_ROLES, args);
};
