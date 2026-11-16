import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@repo/database';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	private readonly logger = new Logger(PrismaService.name);

	async onModuleInit() {
		this.logger.log('Connecting to PostgreSQL database...');
		await this.$connect();
		this.logger.log('Database connected successfully.');
	}

	async onModuleDestroy() {
		this.logger.log('Disconnecting from database...');
		await this.$disconnect();
	}
}