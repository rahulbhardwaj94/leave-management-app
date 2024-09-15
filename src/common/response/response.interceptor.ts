import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Get status code from the request context
        const statusCode = context.switchToHttp().getResponse().statusCode;
        const message = context.switchToHttp().getResponse().message;

        return {
          statusCode: statusCode ?? 200,
          data: {
            data: data,
          },
          error: null,
          message: message ?? 'Success',
        };
      }),
    );
  }
}
