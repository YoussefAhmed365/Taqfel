import { Injectable, Logger } from '@nestjs/common';
import arcjet, { shield, detectBot, slidingWindow, ArcjetNode } from '@arcjet/node';

@Injectable()
export class ArcjetService {
    private readonly logger = new Logger(ArcjetService.name);
    public readonly aj: ArcjetNode<Record<string, unknown>>;

    constructor() {
        this.aj = arcjet({
            key: process.env.ARCJET_KEY || 'ajkey_dummy_for_dev',
            rules: [
                // 1. درع الحماية ضد هجمات الويب الشائعة (SQL injection, XSS, etc.)
                shield({
                    mode: 'LIVE',
                }),
                // 2. كشف الروبوتات الضارة ومنعها
                detectBot({
                    mode: 'LIVE',
                    allow: [], // حظر كل البوتات المؤذية على مسارات الـ API
                }),
                // 3. Rate Limiting: 10 محاولات كحد أقصى كل دقيقة لكل IP
                slidingWindow({
                    mode: 'LIVE',
                    interval: '1m',
                    max: 10,
                }),
            ],
        });
    }
}