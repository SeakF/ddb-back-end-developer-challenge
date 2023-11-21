import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CharacterService],
  exports: [CharacterService]
})
export class CharacterModule {}
