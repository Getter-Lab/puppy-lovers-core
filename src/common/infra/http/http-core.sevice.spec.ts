import { IDateProvider } from '@/common/utils/date/date-provider.interface';
import { HttpModule, HttpService } from '@nestjs/axios';
import { BadGatewayException, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { HttpCoreService } from './http-core.service';
import { IHttpService } from './http-service.interface';

describe('[Unit] HttpCoreService', () => {
  let service: IHttpService;
  let request = null;

  const configServiceMock = {
    get: jest.fn().mockReturnValue(3),
  };

  const httpServiceMock = {
    request: jest.fn(),
  };

  const dateProviderMock = {
    now: jest.fn(),
    diffInMs: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [
        HttpCoreService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
        {
          provide: IDateProvider,
          useValue: dateProviderMock,
        },
        {
          provide: Logger,
          useValue: {
            error: jest.fn(),
            warn: jest.fn(),
          },
        },
      ],
    }).compile();

    service = await module.resolve<HttpCoreService>(HttpCoreService);

    request = {
      method: 'GET',
      url: 'https://api.example.com/data',
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should make a GET request and return data', async () => {
    const result = { data: 'test' };
    jest.spyOn(httpServiceMock, 'request').mockImplementation(() => of(result));

    const response = await service.makeRequest<{ data: string }>(request);
    expect(response).toEqual(result.data);
  });

  it('should make a GET request with params and return data', async () => {
    const result = { data: 'test' };
    jest.spyOn(httpServiceMock, 'request').mockImplementation(() => of(result));
    const requestWithParams = {
      ...request,
      params: { id: 1 },
    };

    const response = await service.makeRequest<{ data: string }>(requestWithParams);
    expect(response).toEqual(result.data);
    expect(httpServiceMock.request).toHaveBeenCalledWith(requestWithParams);
  });

  it('should throw HttpRequestException on error', async () => {
    jest.spyOn(httpServiceMock, 'request').mockRejectedValueOnce('Request failed');

    const servicePromis = service.makeRequest(request);

    await expect(servicePromis).rejects.toThrow(BadGatewayException);
  });
});
