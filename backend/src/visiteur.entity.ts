import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Visiteur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ name: 'full_date' })
  fullDate: string;

  @Column()
  date: string;

  @Column()
  month: string;

  @Column()
  day: number;

  @Column()
  year: string;
}
