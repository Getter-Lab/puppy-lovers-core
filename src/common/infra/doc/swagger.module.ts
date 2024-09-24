import { DynamicModule, Module } from '@nestjs/common';
import { SwaggerService } from './swagger.service';

@Module({
  providers: [SwaggerService],
  exports: [SwaggerService],
})
export class SwaggerModule {
  static forRoot(): DynamicModule {
    return {
      module: SwaggerModule,
      providers: [SwaggerService],
      exports: [SwaggerService],
    };
  }
}
