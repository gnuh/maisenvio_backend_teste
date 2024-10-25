import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TagModule } from './tag/tag.module';

async function bootstrap() {
  const app = await NestFactory.create(TagModule);
  const config = new DocumentBuilder()
    .setTitle('Tags API')
    .setDescription('API para gerenciamento de etiquetas')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
