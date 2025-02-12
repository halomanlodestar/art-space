import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  ConflictError,
} from '../errors/InternalError';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // console.log(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception;
    const isProduction = process.env.NODE_ENV === 'production';

    if (exception instanceof NotFoundError) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (exception instanceof UnauthorizedError) {
      status = HttpStatus.UNAUTHORIZED;
      message = exception.message;
    } else if (exception instanceof BadRequestError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    } else if (exception instanceof ForbiddenError) {
      status = HttpStatus.FORBIDDEN;
      message = exception.message;
    } else if (exception instanceof InternalServerError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;
    } else if (exception instanceof ConflictError) {
      status = HttpStatus.CONFLICT;
      message = exception.message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    if (!isProduction) {
      response.status(status).json({
        status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
      return;
    }

    response.status(status).json({
      status,
      message,
    });
  }
}
