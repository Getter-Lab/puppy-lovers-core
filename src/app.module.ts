import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExampleModule } from './example/example.module';

const ENVIRONMENT = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${ENVIRONMENT}`,
    }),
    ExampleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
