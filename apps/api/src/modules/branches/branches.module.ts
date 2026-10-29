import { Module } from '@nestjs/common';
import { BranchesController } from './branches.controller.js';
import { BranchesService } from './branches.service.js';

@Module({
    controllers: [BranchesController],
    providers: [BranchesService],
    exports: [BranchesService], // لتصديرها لو احتاجتها موديولات أخرى مستقبلاً (مثل الموظفين)
})
export class BranchesModule { }