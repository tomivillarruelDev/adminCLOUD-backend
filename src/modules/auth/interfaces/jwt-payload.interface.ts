/**
 * Interfaz que define la estructura del payload del token JWT
 * Esta interfaz se utiliza para la generación y validación de tokens
 */
export interface JwtPayload {
  /**
   * Identificador único del usuario
   */
  id: string;

  /**
   * Correo electrónico del usuario
   */
  email: string;
}
