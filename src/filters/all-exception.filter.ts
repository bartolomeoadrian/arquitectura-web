import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		const error = ((exception instanceof Error) ? exception.message : exception.message.error) ?? 'Estamos experimentando problemas técnicos';
		const status = exception?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
		const message = exception?.response?.message;

		console.error(exception);

		response
			.status(status)
			.json({
				status,
				error,
				message,
				timestamp: new Date().toISOString(),
			});
	}
}