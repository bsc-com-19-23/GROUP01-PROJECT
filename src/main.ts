<<<<<<< HEAD
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
=======
import { NestFactory } from '@nestjs/core';
import{ValidationPipe }from '@nestjs/common';
>>>>>>> 7183271e08a504e801bebdfe8f429b4eb17185b9
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
=======
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
>>>>>>> 7183271e08a504e801bebdfe8f429b4eb17185b9
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
<<<<<<< HEAD
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
=======
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
>>>>>>> 7183271e08a504e801bebdfe8f429b4eb17185b9
