import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/auth.decorators';
import { PrismaClient } from '@prisma/client';
import { AdminService } from './admin.service';

const prisma = new PrismaClient();


@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Role('admin')

export class AdminController {

    constructor(private adminService: AdminService) { }


    @Get('all-devis')
    async getAllDevis() {
        return this.adminService.getAllDevis();
    }

    @Get('dashboard')
    getDashboard() {
        return 'Bienvenue admin, voici le dashboard';
    }

    @Get('metrics')
    async getMetrics() {
        const totalUsers = await prisma.user.count();

        const recentUsers = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        // Valeurs fictives pour l'instant
        return {
            totalUsers: 15,
            todayConnections: 37,
            contactClicks: 12,
            contactForms: 5,
            recentUsers,
        };
    }


}
