import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    UseGuards,
} from '@nestjs/common';
import { BranchesService } from './branches.service.js';
import { CreateBranchDto } from './dto/create-branch.dto.js';
import { UpdateBranchDto } from './dto/update-branch.dto.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { CurrentOrg } from '../../common/decorators/current-org.decorator.js';

@UseGuards(AuthGuard)
@Controller('api/branches')
export class BranchesController {
    constructor(private readonly branchesService: BranchesService) { }

    @Get()
    async findAll(@CurrentOrg() orgId: string) {
        return this.branchesService.findAll(orgId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @CurrentOrg() orgId: string) {
        return this.branchesService.findOne(id, orgId);
    }

    @Post()
    async create(
        @CurrentOrg() orgId: string,
        @Body() createBranchDto: CreateBranchDto,
    ) {
        return this.branchesService.create(orgId, createBranchDto);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @CurrentOrg() orgId: string,
        @Body() updateBranchDto: UpdateBranchDto,
    ) {
        return this.branchesService.update(id, orgId, updateBranchDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @CurrentOrg() orgId: string) {
        return this.branchesService.remove(id, orgId);
    }
}
