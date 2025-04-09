# Crear Backend Base con NestJS

A continuación se describe el paso a paso para crear una base sólida de backend utilizando NestJS.

## Pasos

1. **Inicializar el proyecto con NestJS CLI**  
   Instalar Nest CLI si no lo tenés:  
   ```bash
   npm i -g @nestjs/cli
   nest new nombre-del-proyecto
   ```

2. **Configurar variables de entorno**  
   Instalar los paquetes necesarios:  
   ```bash
   npm i @nestjs/config
   npm i joi
   ```  
   - Usar `@nestjs/config` para manejar las variables de entorno.
   - Usar `joi` para definir un esquema de validación de dichas variables.
   - Crear el archivo `.env` y cargarlo en el módulo raíz (`AppModule`).

3. **Configuración base de la base de datos**  
   - Instalar y configurar el paquete de base de datos (ejemplo con PostgreSQL y TypeORM):  
     ```bash
     npm i @nestjs/typeorm typeorm pg
     ```  
   - Configurar las credenciales en `.env`.
   - Integrar `TypeOrmModule` en el `AppModule`.

4. **Configurar prefijos de rutas globales**  
   Por ejemplo, agregar `api/v1` como prefijo:
   ```ts
   app.setGlobalPrefix('api/v1');
   ```

5. **Configurar los pipes a nivel global**  
   Activar la validación y transformación automática de los DTOs:  
   ```ts
   app.useGlobalPipes(
     new ValidationPipe({
       whitelist: true,
       transform: true,
       transformOptions: {
         enableImplicitConversion: true,
       },
     }),
   );
   ```

6. **Instalar librerías para validación y transformación de DTOs**  
   ```bash
   npm i class-validator class-transformer
   ```

7. **Implementar paginación reutilizable**  
   - Crear un DTO base con propiedades como `page`, `limit`, `order`, etc.
   - Reutilizar este DTO en los controladores donde se necesite paginar datos.

8. **Habilitar y configurar CORS**  
   ```ts
   app.enableCors({
     origin: '*', // Ajustar según tus necesidades
   });
   ```

9. **Cargar archivos usando Multer**  
   - Instalar Multer:
     ```bash
     npm i @nestjs/platform-express multer
     ```  
   - Usar el decorador `@UseInterceptors(FileInterceptor('file'))` para manejar archivos en controladores.

10. **Autenticación (Auth)**  
   - Instalar JWT y bcrypt:
     ```bash
     npm i @nestjs/jwt passport-jwt @nestjs/passport passport bcrypt
     ```  
   - Crear módulo de autenticación con estrategias JWT.
   - Proteger rutas con guardas (`@UseGuards(AuthGuard('jwt'))`).

11. **Documentar la API con Swagger**  
   - Instalar Swagger:
     ```bash
     npm i @nestjs/swagger swagger-ui-express
     ```  
   - Configurar Swagger en el `main.ts`:
     ```ts
     const config = new DocumentBuilder()
       .setTitle('API Base')
       .setDescription('Documentación de la API')
       .setVersion('1.0')
       .build();
     const document = SwaggerModule.createDocument(app, config);
     SwaggerModule.setup('docs', app, document);
     ```

12. **Manejo global de excepciones**  
   - Crear un `GlobalExceptionFilter` para personalizar las respuestas de error.
   - Usar `app.useGlobalFilters(new GlobalExceptionFilter())`.

13. **Implementar estrategias de caché**  
   - Activar el módulo de caché de NestJS:
     ```bash
     import { CacheModule } from '@nestjs/common';
     ```
   - Configurar en el módulo raíz:
     ```ts
     CacheModule.register({
       ttl: 5, // segundos
       max: 100, // número máximo de elementos en caché

      @UseInterceptors(CacheInterceptor) // Aplica el interceptor a todas las rutas de este controlado
     });
     ```
