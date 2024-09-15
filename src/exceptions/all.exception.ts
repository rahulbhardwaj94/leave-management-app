import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import * as lodash from 'lodash';

/**
 * The AllExceptionFilter filters all the uncaught exceptions generated
 * through the application
 */
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  /**
   * The parameterized constructor
   * @param httpAdapterHost {@link HttpAdapterHost}
   */
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  /**
   * ExceptionFilter catch method, handles all the uncaught exceptions
   * generated throughout the application.
   * The uncaught exceptions returned with a standard format
   *
   * @param exception any
   * @param host ArgumentsHost
   */
  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const message = lodash.isEmpty(exception?.message)
      ? exception
      : exception.message;
    const stack = lodash.isEmpty(exception?.stack)
      ? exception
      : exception.stack;
    const errorResponse = exception?.response
      ? exception?.response
      : message
        ? { message }
        : { message: 'Something went wrong !!' };
    const error = {
      ...errorResponse,
      stack,
    };

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      data: {
        data: 'data not available',
      },
      error: error,
      message: message ?? 'NA',
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
