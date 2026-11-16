import { IsInt, IsOptional, IsString, IsArray, Min } from "class-validator";

export class UpdateBranchDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    code?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsArray()
    @IsOptional()
    weekendDays?: string[];

    @IsInt()
    @Min(0)
    @IsOptional()
    annualLeaveDays?: number;
}