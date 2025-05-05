import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/handle-all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('AdminCLOUD API')
    .setDescription('API para la gestión de personas, contactos y empresas')
    .setVersion('1.0')
    .addTag('person', 'Operaciones relacionadas con personas')
    .addTag('real-person', 'Gestión de personas físicas')
    .addTag('legal-person', 'Gestión de personas jurídicas')
    .addTag('contact', 'Gestión de contactos')
    .addTag('company', 'Gestión de empresas')
    .addTag('agent', 'Gestión de agentes')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
