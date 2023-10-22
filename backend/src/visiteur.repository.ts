import { Repository } from 'typeorm';
import { Visiteur } from './visiteur.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VisiteurRepository extends Repository<Visiteur> {}
