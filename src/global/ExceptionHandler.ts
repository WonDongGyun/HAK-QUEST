import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { NotFoundUserException } from 'src/user/exception/NotFoundUserException';

@Catch()
export class ExceptionHandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (exception instanceof NotFoundUserException) {
      response.status(status).json({
        statusCode: status,
        message: exception.message,
        // path: request.url,
      });
    }
  }
}
