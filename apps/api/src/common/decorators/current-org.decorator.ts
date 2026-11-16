import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';

export const CurrentOrg = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const orgId = request.session?.activeOrganizationId;

		if (!orgId) {
			throw new ForbiddenException('No active organization selected');
		}

		return orgId;
	},
);