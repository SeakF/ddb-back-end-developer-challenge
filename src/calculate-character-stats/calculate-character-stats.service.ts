import { Injectable } from '@nestjs/common';
import { Defense } from 'src/character/character.interface';
import { CharacterService } from 'src/character/character.service';
import { Defense as PrismaDefence, DefenseType as PrismaDefenseType } from '@prisma/client';

type DamageType = Defense['type'];

@Injectable()
export class CalculateCharacterStatsService {
    constructor(private readonly characterService: CharacterService) {}

    async dealDamage(id: string, damageType: DamageType, amount: number) {
        const character = await this.characterService.readNested(id, { defenses: true });
        const { hitPoints, temporaryHitPoints, defenses } = character;
        
        const actualDamageAmount = this.calculateDamageWithDefenses(amount, defenses, PrismaDefenseType[damageType.toLowerCase()]);

        const remainingDamage = Math.max(0, actualDamageAmount - temporaryHitPoints);
        const newHitPoints = Math.max(0, hitPoints - remainingDamage);
        const newTemporaryHitPoints = Math.max(0, temporaryHitPoints - actualDamageAmount);

        return await this.characterService.update(id, {
            hitPoints: newHitPoints,
            temporaryHitPoints: newTemporaryHitPoints
        });
    }

    private calculateDamageWithDefenses(amount: number, defenses: PrismaDefence[] | [], damageType: PrismaDefenseType): number {
        let actualDamage = amount;
        for (const defenseEntry of defenses) {
            if (defenseEntry.type === damageType) {
                switch (defenseEntry.defense) {
                    case 'immunity':
                        actualDamage = 0;
                        break;
                    
                    case 'resistance':
                        actualDamage = Math.floor(amount / 2);
                        break;
                }
            }
        }
        return actualDamage;
    }

    async heal(id: string, amount: number) {
        const character = await this.characterService.read(id);
        const { hitPoints, maxAmountOfHitPoints } = character;

        const newHitPointsValue = (hitPoints + amount) > maxAmountOfHitPoints ? 
            maxAmountOfHitPoints : 
            hitPoints + amount; 

        return await this.characterService.update(id, { hitPoints: newHitPointsValue });
    }

    async addTemporaryHitPoints(id: string, amount: number) {
        const character = await this.characterService.read(id);
        const { temporaryHitPoints } = character; 

        const newTemporaryHitPoinstValue = temporaryHitPoints > amount ? temporaryHitPoints : amount;

        return await this.characterService.update(id, { temporaryHitPoints: newTemporaryHitPoinstValue });
    }
}
