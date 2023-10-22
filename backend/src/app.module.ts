import { Module } from '@nestjs/common';
import { VisiteurController } from './visiteur.controller';
import { VisiteurService } from './visiteur.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { Visiteur } from './visiteur.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(databaseConfig),
    TypeOrmModule.forFeature([Visiteur]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
  ],
  controllers: [VisiteurController],
  providers: [VisiteurService],
})
export class AppModule {}
