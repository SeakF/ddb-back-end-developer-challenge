import { Module } from '@nestjs/common';
import { CalculateCharacterStatsService } from './calculate-character-stats.service';
import { CharacterModule } from 'src/character/character.module';

@Module({
  imports: [CharacterModule],
  providers: [CalculateCharacterStatsService],
  exports: [CalculateCharacterStatsService]
})
export class CalculateCharacterStatsModule {}
