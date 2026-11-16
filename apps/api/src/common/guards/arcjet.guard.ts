import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ArcjetService } from '../../lib/arcjet/arcjet.service.js';

@Injectable()
export class ArcjetGuard implements CanActivate {
    constructor(private readonly arcjetService: ArcjetService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        // فحص الطلب عبر Arcjet
        const decision = await this.arcjetService.aj.protect(req);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                throw new HttpException('Too Many Requests - Rate limit exceeded', HttpStatus.TOO_MANY_REQUESTS);
            }
            if (decision.reason.isBot()) {
                throw new HttpException('Automated requests forbidden', HttpStatus.FORBIDDEN);
            }
            throw new HttpException('Access Denied by Security Policy', HttpStatus.FORBIDDEN);
        }

        return true;
    }
}