// Exportaciones de DTOs desde sus nuevas ubicaciones
// Common DTOs
export * from '../common/dto/address.dto';

// Person DTOs
export * from './create-person.dto';
export * from './update-person.dto';

// Real Person DTOs
export * from '../real-person/dto/create-real-person.dto';
export * from '../real-person/dto/update-real-person.dto';

// Legal Person DTOs
export * from '../legal-person/dto/create-legal-person.dto';
export * from '../legal-person/dto/update-legal-person.dto';

// Agent DTOs
export * from '../submodules/agent/dto/create-agent.dto';
export * from '../submodules/agent/dto/update-agent.dto';

// Company DTOs
export * from '../submodules/company/dto/create-company.dto';
export * from '../submodules/company/dto/update-company.dto';

// Contact DTOs
export * from '../submodules/contact/dto/create-contact.dto';
export * from '../submodules/contact/dto/update-contact.dto';
