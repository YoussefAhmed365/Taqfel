import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../lib/database/prisma/prisma.service.js';
import { CreateBranchDto } from './dto/create-branch.dto.js';
import { UpdateBranchDto } from './dto/update-branch.dto.js';

@Injectable()
export class BranchesService {
    constructor(private readonly prisma: PrismaService) { }

    // 1. Get all organization's branches with employees count
    async findAll(organizationId: string) {
        return this.prisma.branch.findMany({
            where: { organizationId },
            include: {
                _count: {
                    select: { employees: true },
                },
            },
            orderBy: { createdAt: 'asc' },
        });
    }

    // 2. Get organization's branch with employees count
    async findOne(id: string, organizationId: string) {
        const branch = await this.prisma.branch.findFirst({
            where: { id, organizationId },
            include: {
                _count: {
                    select: { employees: true },
                },
            },
        });

        if (!branch) {
            throw new NotFoundException('Branch not found');
        }

        return branch;
    }

    // 3. Create organization's branch with plan's branches limit check
    async create(organizationId: string, dto: CreateBranchDto) {
        const org = await this.prisma.organization.findUnique({
            where: { id: organizationId },
            include: { plan: true },
        });

        if (!org) {
            throw new NotFoundException('Organization not found');
        }

        const currentBranchesCount = await this.prisma.branch.count({
            where: { organizationId },
        });

        // If the plan has a limit (and not -1 for unlimited)
        if (org.plan.maxBranches !== -1 && currentBranchesCount >= org.plan.maxBranches) {
            throw new ForbiddenException(
                `You have reached the maximum number of branches allowed in your plan (${org.plan.maxBranches} branches)`,
            );
        }

        // Check for duplicate branch code within the same organization
        if (dto.code) {
            const existing = await this.prisma.branch.findFirst({
                where: { organizationId, code: dto.code },
            });
            if (existing) {
                throw new ConflictException('Branch code already exists in this organization');
            }
        }

        return this.prisma.branch.create({
            data: {
                organizationId,
                name: dto.name,
                code: dto.code,
                address: dto.address,
                phone: dto.phone,
                weekendDays: dto.weekendDays || ['FRIDAY', 'SATURDAY'],
                annualLeaveDays: dto.annualLeaveDays ?? 21,
                // If the first branch is created, make it the default branch
                isDefault: currentBranchesCount === 0,
            },
        });
    }

    // 4. Update branch's data
    async update(id: string, organizationId: string, dto: UpdateBranchDto) {
        // Check if the branch exists and belongs to the organization
        await this.findOne(id, organizationId);

        return this.prisma.branch.update({
            where: { id },
            data: dto,
        });
    }

    // 5. Delete branch (prevent deletion if it has employees)
    async remove(id: string, organizationId: string) {
        const branch = await this.findOne(id, organizationId);

        const employeesCount = await this.prisma.employee.count({
            where: { branchId: id },
        });

        if (employeesCount > 0) {
            throw new ForbiddenException(
                'Cannot delete this branch because it contains employees. Please move the employees first.',
            );
        }

        if (branch.isDefault) {
            throw new ForbiddenException('Cannot delete the default branch of the organization');
        }

        return this.prisma.branch.delete({
            where: { id },
        });
    }
}
