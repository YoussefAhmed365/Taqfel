import { Controller, All, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from '../../lib/auth/better-auth.js';
import { ArcjetGuard } from '../../common/guards/arcjet.guard.js';

@UseGuards(ArcjetGuard)
@Controller('api/auth')
export class AuthController {
	@All('*')
	async handleAuth(@Req() req: Request, @Res() res: Response) {
		// toNodeHandler يتولى فحص المسار والرد تلقائياً (login, signup, session, org, etc.)
		return toNodeHandler(auth)(req, res);
	}
}