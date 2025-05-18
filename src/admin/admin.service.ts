import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AdminService {
    async getAllDevis() {
        const devis = await prisma.devis.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return devis;
    }
}
