import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoadCharacterOnInitModule } from './load-character-on-init/load-character-on-init.module';
import { ConfigModule } from '@nestjs/config';
import { CalculateCharacterStatsModule } from './calculate-character-stats/calculate-character-stats.module';
import { CharacterModule } from './character/character.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    LoadCharacterOnInitModule,
    ConfigModule.forRoot({
      envFilePath: ['.env']
    }),
    CalculateCharacterStatsModule,
    CharacterModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
