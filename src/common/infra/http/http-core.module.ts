import { IDateProvider } from '@/common/utils/date/date-provider.interface';
import { DayjsDateProvider } from '@/common/utils/date/dayjs-date';
import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpCoreService } from './http-core.service';

@Global()
@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    HttpCoreService,
    {
      provide: IDateProvider,
      useClass: DayjsDateProvider,
    },
  ],
  exports: [HttpCoreService],
})
export class HttpCoreModule {}
