import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '@repo/contracts';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        let message: string = 'Internal server error';

        if (exception instanceof HttpException) {
            const res = exception.getResponse();
            if (typeof res === 'string') {
                message = res;
            } else if (typeof res === 'object' && res !== null && 'message' in res) {
                const resMessage = (res as { message: unknown }).message;
                message = Array.isArray(resMessage) ? resMessage.join(', ') : String(resMessage);
            }
        } else if (exception instanceof Error) {
            message = exception.message;
        }


        const errorPayload: ApiResponse = {
            success: false,
            error: {
                code: HttpStatus[status] || 'UNKNOWN_ERROR',
                message: Array.isArray(message) ? message.join(', ') : message,
            },
        };

        this.logger.error(`HTTP Status: ${status} Error: ${JSON.stringify(errorPayload.error)}`);

        response.status(status).json(errorPayload);
    }
}