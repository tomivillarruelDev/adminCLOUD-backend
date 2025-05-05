/**
 * Enumeración de roles válidos para el control de acceso en el sistema
 * Estos roles determinan los permisos y acceso de los usuarios a diferentes funcionalidades
 */
export enum ValidRoles {
  /**
   * Rol de administrador con acceso completo al sistema
   */
  admin = 'admin',

  /**
   * Rol de super usuario con privilegios extendidos
   */
  superUser = 'super-user',

  /**
   * Rol de usuario regular con acceso básico
   */
  user = 'user',
}
