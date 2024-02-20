import * as http from 'http';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

interface HttpExceptionResponse {
  statusCode: number;
  message: string;
  error: string;
}

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    console.log({ exception });

    if (exception instanceof HttpException) {
      return ctx
        .getResponse()
        .status(exception.getStatus())
        .json({
          code: exception.getStatus(),
          status: http.STATUS_CODES[exception.getStatus()],
          data: (exception.getResponse() as HttpExceptionResponse)?.message,
        });
    }

    return ctx.getResponse().status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      status: http.STATUS_CODES[HttpStatus.INTERNAL_SERVER_ERROR],
    });
  }
}
