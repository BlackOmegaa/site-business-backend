import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MailService } from '../mail/mail.service';


const prisma = new PrismaClient();

@Injectable()
export class DevisService {
    constructor(private readonly mailService: MailService) { }



    async saveStep(data: any) {
        const { id, isSend, step, ...formData } = data;

        if (id && !isNaN(parseInt(id))) {
            const existing = await prisma.devis.findUnique({
                where: { id: parseInt(id) },
            });

            if (existing) {
                const updated = await prisma.devis.update({
                    where: { id: parseInt(id) },
                    data: {
                        ...formData,
                        step,
                        isSend,
                    },
                });

                if (isSend) {
                    await this.mailService.sendDevisConfirmation(updated.email, updated.prenom, updated.prestation, updated.message, updated.preference);
                }

                return updated;
            }
        }

        const created = await prisma.devis.create({
            data: {
                ...formData,
                step,
                isSend,
            },
        });

        if (isSend) {
            await this.mailService.sendDevisConfirmation(created.email, created.prenom, created.prestation, created.message, created.preference);
        }

        return created;
    }


    async markAsRead(id: number) {
        return prisma.devis.update({
            where: { id },
            data: { isRead: true },
        });
    }

    async updateEtat(id: number, etat: string) {
        return prisma.devis.update({
            where: { id },
            data: { etat },
        });
    }

    async addComment(devisId: number, message: string) {
        return prisma.commentaire.create({
            data: {
                message,
                devisId,
            },
        });
    }

    async getCommentaires(devisId: number) {
        return prisma.commentaire.findMany({
            where: { devisId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByClient(email: string) {
        return prisma.devis.findMany({
            where: { email },
            include: { commentaires: true },
        });
    }

}
