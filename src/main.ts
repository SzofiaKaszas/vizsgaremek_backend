import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'node:path';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(path.join(__dirname, '..', '..', 'public'));
  app.setBaseViewsDir(path.join(__dirname, '..', '..', 'views'));

  app.setViewEngine('ejs');

  // Swagger setup - API Documentation
  const config = new DocumentBuilder()
    .setTitle('Roommate and House Listing API')
    .setDescription('The Roommate and House Listing API description')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, documentFactory);
  

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
