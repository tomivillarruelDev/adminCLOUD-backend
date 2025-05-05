/**
 * Interfaz que define las operaciones para validar personas
 * en el sistema de gestión de contactos y empresas
 */
export interface IPersonValidator {
  /**
   * Verifica que una persona real exista en la base de datos
   * @param id Identificador MongoDB de la persona real
   * @throws BadRequestException si el ID no es válido o no existe
   */
  verifyRealPersonExists(id: string): Promise<void>;

  /**
   * Verifica que una persona legal exista en la base de datos
   * @param id Identificador MongoDB de la persona legal
   * @throws BadRequestException si el ID no es válido o no existe
   */
  verifyLegalPersonExists(id: string): Promise<void>;
}

// Token de inyección para el validador de personas
export const PERSON_VALIDATOR = 'PERSON_VALIDATOR';
