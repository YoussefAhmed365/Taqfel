import { IsNotEmpty, IsString, IsOptional, IsArray, IsInt, Min } from "class-validator";

export class CreateBranchDto {
    @IsString()
    @IsNotEmpty({ message: "Branch name is required" })
    name: string;

    @IsString()
    @IsOptional()
    code?: string; // كود مميز للفرع (مثل CAI-01)

    @IsString()
    @IsOptional()
    address?: string;
    
    @IsString()
    @IsOptional()
    phone?: string;
    
    @IsArray()
    @IsOptional()
    weekendDays?: string[]; // مثال: ["FRIDAY", "SATURDAY"]
    
    @IsInt()
    @Min(0)
    @IsOptional()
    annualLeaveDays?: number; // رصيد الإجازات السنوي الأساسي للفرع (الافتراضي 21)
}