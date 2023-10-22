import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { Visiteur } from './visiteur.entity';
import { VisiteurService } from './visiteur.service';

@Controller('visiteur')
export class VisiteurController {
  constructor(private readonly visiteurService: VisiteurService) {}

  @Get()
  async getAllVisiteurs() {
    return this.visiteurService.getAllVisiteurs();
  }
  @Get('')
  async getParticipantsParMois() {
    return this.visiteurService.getParticipants();
  }

  @Get('/taux-remplissage')
  async getTauxRemplissageParMois() {
    return this.visiteurService.getTauxRemplissageParMois();
  }
  @Get('/visite/:date')
  async getParticipantsByDate(@Param('date') date: string) {
    const reponse = await this.visiteurService.getParticipantsByDate(date);
    console.log(reponse);
    return reponse;
  }

  @Post()
  async createVisiteur(@Body() visiteurData: Visiteur) {
    return this.visiteurService.createVisiteur(visiteurData);
  }
}
