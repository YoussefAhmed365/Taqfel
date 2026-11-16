import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	systemHealth(): string {
		return 'System Operates Well';
	}
}
