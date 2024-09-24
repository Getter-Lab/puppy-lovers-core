import { INestApplication, Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class SwaggerService {
  private readonly DEFAULT_SWAGGER_PREFIX = '/docs';
  private readonly PROJECT_NAME = 'NestJS API';
  private readonly PROJECT_DESCRIPTION = 'NestJS API description';
  private readonly PROJECT_VERSION = '1.0.0';

  constructor() {}

  setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
      .setTitle(process.env.PROJECT_NAME || this.PROJECT_NAME)
      .setDescription(process.env.PROJECT_DESCRIPTION || this.PROJECT_DESCRIPTION)
      .setVersion(process.env.PROJECT_VERSION || this.PROJECT_VERSION)
      .build();

    const document = SwaggerModule.createDocument(app, options);
    const path = process.env.SWAGGER_PREFIX || this.DEFAULT_SWAGGER_PREFIX;
    SwaggerModule.setup(path, app, document);
  }
}
