import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS if needed
  app.enableCors();

  // Use Helmet for security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'script-src': ["'self'", "'unsafe-inline'", "'wasm-unsafe-eval'"],
          'style-src': ["'self'", "'unsafe-inline'"],
        },
      },
    }),
  );

  // Set a global prefix for all routes (optional)
  app.setGlobalPrefix('api');

  // Get the port from environment variables or default to 9000
  const port = process.env.PORT || 9000;

  // Start the server
  await app.listen(port);

  // Log the application URL
  console.log(`🚀 The system is running on: http://localhost:${port}`);
}

bootstrap();


// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
//
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const port = process.env.PORT ?? 9000; // Use the environment variable or default to 3000
//   await app.listen(port); // Start the server
//   console.log(`The system is running on Port: http://localhost:${port}`);
// }
// bootstrap();
