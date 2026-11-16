import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../../lib/auth/better-auth.js';

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		// استخراج الجلسة من Better Auth باستخدام هيدرز الطلب
		const session = await auth.api.getSession({
			headers: fromNodeHeaders(request.headers),
		});

		if (!session) {
			throw new UnauthorizedException('Authentication required');
		}

		// نحفظ بيانات المستخدم والـ session في كائن الـ request لاستخدامها لاحقاً
		request.user = session.user;
		request.session = session.session;

		return true;
	}
}