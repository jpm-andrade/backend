import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ————————————————
  // 1. Security headers with Helmet
  // ————————————————
  // Helmet sets a bunch of HTTP headers (CSP, HSTS, X-Frame-Options, etc.) 
  // to protect against common web vulnerabilities.
  app.use(helmet());

  // ————————————————
  // 2. Gzip/deflate compression
  // ————————————————
  // Compresses responses to reduce payload size.
  app.use(compression());

  // ————————————————
  // 3. CORS
  // ————————————————
  // Allow your frontend origin(s) and credentials (cookies, auth headers).
  app.enableCors({
    origin: 'http://localhost:3000', // or '*' for “allow any origin” (not recommended for prod)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // ————————————————
  // 4. Global validation pipe
  // ————————————————
  // Strips out any properties not in your DTOs, and rejects unknown inputs.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // remove non-whitelisted props
      forbidNonWhitelisted: true,   // throw an error if extra props are present
      transform: true,              // auto-convert payloads to DTO classes
    }),
  );


  // ————————————————
  // 5. Swagger (only in dev/test)
  // ————————————————
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Ombar API')
      .setDescription('Back-office endpoints')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
  }

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port);
  console.log(`🚀 Application listening on port ${port}`);
}
bootstrap();
