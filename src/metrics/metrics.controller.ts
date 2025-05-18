import { Controller, Param, Post, Get } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


@Controller('metrics')
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) { }

    @Post('increment/:field')
    async increment(@Param('field') field: 'todayConnections' | 'contactClicks' | 'contactForms') {
        return this.metricsService.incrementField(field);
    }

    @Get('today')
    async getToday() {
        return this.metricsService.getTodayMetrics();
    }

    @Get('global')
    async getGlobalMetrics() {
        const metrics = await prisma.metric.findMany();

        const total = metrics.reduce(
            (acc, m) => ({
                todayConnections: acc.todayConnections + m.todayConnections,
                contactClicks: acc.contactClicks + m.contactClicks,
                contactForms: acc.contactForms + m.contactForms,
            }),
            { todayConnections: 0, contactClicks: 0, contactForms: 0 }
        );

        return total;
    }

}
