import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class MetricsService {
    async incrementField(field: 'todayConnections' | 'contactClicks' | 'contactForms') {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // 🔍 Trouve une ligne de la journée (entre minuit et 23h59)
        const existing = await prisma.metric.findFirst({
            where: {
                date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });

        // ✅ Si elle existe, on l’incrémente
        if (existing) {
            return await prisma.metric.update({
                where: { id: existing.id },
                data: {
                    [field]: { increment: 1 },
                },
            });
        }

        // 🚨 Sinon, on la crée proprement (champ date = 00:00:00.000)
        return await prisma.metric.create({
            data: {
                date: startOfDay,
                todayConnections: field === 'todayConnections' ? 1 : 0,
                contactClicks: field === 'contactClicks' ? 1 : 0,
                contactForms: field === 'contactForms' ? 1 : 0,
            },
        });
    }

    async getTodayMetrics() {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        return await prisma.metric.findFirst({
            where: {
                date: {
                    gte: start,
                    lte: end,
                },
            },
        });
    }
}
