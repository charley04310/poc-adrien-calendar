import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visiteur } from './visiteur.entity';
import { VisiteurRepository } from './visiteur.repository';

@Injectable()
export class VisiteurService {
  constructor(
    @InjectRepository(Visiteur)
    private readonly visiteurRepository: VisiteurRepository,
  ) {}

  async getAllVisiteurs(): Promise<Visiteur[]> {
    return this.visiteurRepository.find();
  }

  async getParticipants() {
    const query = `
      SELECT month, day, COUNT(DISTINCT nom) as participants
      FROM visiteur
      GROUP BY month, day
    `;

    const results = await this.visiteurRepository.query(query);
    return results;
  }

  async getParticipantsByDate(date: string) {
    const query = `
      SELECT nom
      FROM visiteur
      WHERE date = '${date}'
    `;

    const results = await this.visiteurRepository.query(query);
    return results;
  }

  async getTauxRemplissageParMois() {
    const query = `
        SELECT month, COUNT(DISTINCT day) as jours, COUNT(DISTINCT nom) as participants
        FROM visiteur
        GROUP BY month
      `;

    const results = await this.visiteurRepository.query(query);
    return results;
  }

  async createVisiteur(visiteurData: Visiteur): Promise<Visiteur> {
    const nouveauVisiteur = this.visiteurRepository.create(visiteurData);
    return this.visiteurRepository.save(nouveauVisiteur);
  }
}
