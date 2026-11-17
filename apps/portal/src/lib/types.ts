export type Language = 'ar' | 'en';

export interface EmployeeDemo {
	id: string;
	name: string;
	role: string;
	department: string;
	branch: string;
	status: 'active' | 'leave' | 'review';
	joinedDate: string;
	avatarSeed: string;
}

export interface BranchDemo {
	id: string;
	name: string;
	city: string;
	employeeCount: number;
	manager: string;
	code: string;
}