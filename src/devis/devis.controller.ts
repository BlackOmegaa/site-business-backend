import { Controller, Post, Body, Patch, Param, Get, UseGuards, Request } from '@nestjs/common';
import { DevisService } from './devis.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('api/devis')
export class DevisController {
    constructor(private readonly devisService: DevisService) { }

    @Post('save-step')
    saveStep(@Body() body: any) {
        console.log('Body reçu :', body);

        return this.devisService.saveStep(body);
    }

    @Patch('mark-as-read/:id')
    markAsRead(@Param('id') id: string) {
        return this.devisService.markAsRead(+id);
    }


    @Patch(':id/etat')
    updateEtat(@Param('id') id: string, @Body('etat') etat: string) {
        return this.devisService.updateEtat(Number(id), etat);
    }

    @Post(':id/commentaires')
    addComment(@Param('id') id: string, @Body('message') message: string) {
        return this.devisService.addComment(Number(id), message);
    }

    @Post(':id/commentaires/all')
    getCommentaires(@Param('id') id: string) {
        return this.devisService.getCommentaires(Number(id));
    }

    @Get('by-client')
    @UseGuards(AuthGuard('jwt'))
    getDevisByClient(@Request() req) {
        return this.devisService.findByClient(req.user.email);
    }

}
