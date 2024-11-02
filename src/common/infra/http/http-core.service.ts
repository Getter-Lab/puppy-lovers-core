import { IDateProvider } from '@/common/utils/date/date-provider.interface';
import { HttpService } from '@nestjs/axios';
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, from, lastValueFrom, map, retry } from 'rxjs';
import { IHttpRequest, IHttpService } from './http-service.interface';

@Injectable()
export class HttpCoreService implements IHttpService {
  private readonly DEFAULT_RETRY_ATTEMPTS = 3;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly dateProvider: IDateProvider,
    private readonly logger: Logger,
  ) {}

  async makeRequest<T>(request: IHttpRequest): Promise<T> {
    const requestAttempts = this.configService.get('HTTP_RETRY_ATTEMPTS', this.DEFAULT_RETRY_ATTEMPTS);
    const startTime = this.dateProvider.now();
    return lastValueFrom<T>(
      from(this.httpService.request<T>(request)).pipe(
        retry(requestAttempts),
        catchError((error) => {
          const responseError = {
            message: error.message || error.cause,
            status: error?.response?.status,
          };
          this.logger.error('HTTP_REQUEST_ERROR', JSON.stringify(responseError), HttpCoreService.name);
          throw new BadGatewayException({
            message: error?.message,
          });
        }),
        map(({ data }) => data),
        map((data: any) => {
          return data?.data || data;
        }),
      ),
    ).finally(() => {
      const duration = this.dateProvider.diffInMs(new Date(this.dateProvider.now()), new Date(startTime));
      this.logger.warn(`${request.method?.toUpperCase()} - ${request.url} EXECUTED IN ${duration}ms`, HttpService.name);
    });
  }
}
