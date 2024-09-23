import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/infra/database/database.module';
import { ExampleModule } from './modules/example/example.module';

const ENVIRONMENT = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${ENVIRONMENT}`,
    }),
    ExampleModule,
    DatabaseModule,
  ],
})
export class AppModule {}
