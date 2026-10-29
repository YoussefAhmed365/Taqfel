import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { PrismaModule } from './lib/database/prisma/prisma.module.js';
import { ArcjetModule } from './lib/arcjet/arcjet.module.js';
import { BranchesModule } from './modules/branches/branches.module.js';

@Module({
	imports: [PrismaModule, ArcjetModule, AuthModule, BranchesModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
