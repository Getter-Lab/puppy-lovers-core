import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

const swaggerApiResponse = {
  [HttpStatus.OK]: ApiOkResponse,
  [HttpStatus.NO_CONTENT]: ApiNoContentResponse,
  [HttpStatus.BAD_REQUEST]: ApiBadRequestResponse,
  [HttpStatus.NOT_FOUND]: ApiNotFoundResponse,
  [HttpStatus.INTERNAL_SERVER_ERROR]: ApiInternalServerErrorResponse,
};

export const ApiCustomDoc = <T>(options: {
  summary: string;
  responses?: {
    status: HttpStatus;
    description: string;
    type: Type<T> | string;
  }[];
}): ReturnType<typeof applyDecorators> => {
  const apiDecorators = [ApiOperation({ summary: options.summary })];

  if (options.responses?.length) {
    options.responses.forEach((exception) => {
      const decorator = swaggerApiResponse[exception.status] || swaggerApiResponse[HttpStatus.INTERNAL_SERVER_ERROR];
      apiDecorators.push(
        decorator({
          description: exception.description,
          type: exception.type,
        }),
      );
    });
  }

  return applyDecorators(...apiDecorators);
};
