import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { RolesGuard } from '../auth/roles.guard';
import { AdminService } from './admin.service';

@Module({
    controllers: [AdminController],
    providers: [RolesGuard, AdminService],
})
export class AdminModule { }
