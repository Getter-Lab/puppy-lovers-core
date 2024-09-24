import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from './common/infra/doc/swagger.module';
import { SwaggerService } from './common/infra/doc/swagger.service';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const swaggerService = app.select(SwaggerModule).get(SwaggerService);
  swaggerService.setupSwagger(app);

  const SERVER_PORT = process.env.SERVER_PORT || 3000;
  await app.listen(SERVER_PORT, () => {
    logger.log(`Server running on http://localhost:${SERVER_PORT}`);
  });
}

bootstrap();
