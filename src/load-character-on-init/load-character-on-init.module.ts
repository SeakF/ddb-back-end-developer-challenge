import { Module, ValidationPipe, Logger } from '@nestjs/common';
import { LoadCharacterOnInitService } from './load-character-on-init.service';
import { LoadJsonService } from './load-json.service';
import { ConfigModule } from '@nestjs/config/dist';
import { CharacterModule } from 'src/character/character.module';

@Module({
  imports: [ConfigModule, CharacterModule],
  providers: [LoadCharacterOnInitService, LoadJsonService, ValidationPipe, Logger]
})
export class LoadCharacterOnInitModule {}
