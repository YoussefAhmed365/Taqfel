import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { organization, twoFactor } from 'better-auth/plugins';
import { prisma } from '@repo/database';

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		organization({
			allowUserToCreateOrganization: true, // يتيح للشركات التسجيل
		}),
		twoFactor(), // التحقق بخطوتين للمديرين
	],
});