import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { CharacterDto } from 'src/character/character.dto';
import { LoadJsonService } from './load-json.service';
import { validateOrReject } from 'class-validator';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { CharacterService } from 'src/character/character.service';

@Injectable()
export class LoadCharacterOnInitService implements OnModuleInit {
    constructor(
        private readonly characterService: CharacterService,
        private readonly loadJsonService: LoadJsonService,
        private readonly logger: Logger,
        private readonly configService: ConfigService
    ) {}

    async onModuleInit() {
        const { file, fileName } = this.loadJsonService.loadFile(this.configService.get('PATH_TO_FILE'));
        if (await this.isCharacter(file)) {
            const characterExist = await this.characterService.read(fileName);
            const characterSaved = characterExist ? characterExist : await this.characterService.create(file as CharacterDto);

            if (characterSaved) {
                this.logger.log(`Character: "${fileName}" loaded properly`, 'CharacterLoader');
            } else {
                this.logger.error(`Character: "${fileName}" already exist`, 'CharacterLoader');
            }            
        } else {
            // log error instead of throwing error because we don't want to shutdown app entirely in case of some random file
            this.logger.error(`Loaded file: "${fileName}" is not type of a character:\n${JSON.stringify(file)}`);
        }
    }

    private async isCharacter(data: CharacterDto): Promise<boolean> {
        const characterDto = new CharacterDto();
        Object.assign(characterDto, data);

        try {
            await validateOrReject(characterDto);
            return true;
        } catch {
            return false;
        }
    }
}
