import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DefenseType as PrismaDefenseType, DefenseStrength as PrismaDefenseStrength } from '@prisma/client';
import { CharacterWithTemporaryHitPointsAndMaxHitPoints, Item, Defense, Character } from './character.interface';

type SupportedCharacterProps = Omit<CharacterWithTemporaryHitPointsAndMaxHitPoints, 'name' | 'level' | 'maxAmountOfHitPoints' | 'classes' | 'stats' | 'items' | 'defenses'>;
type IncludeNestedValuesOfCharacter = keyof Omit<CharacterWithTemporaryHitPointsAndMaxHitPoints, 'name' | 'level' | 'maxAmountOfHitPoints' | 'temporaryHitPoints' | 'hitPoints'>;
type IncludedNestedValuesForCharacter = Partial<Record<IncludeNestedValuesOfCharacter, boolean>>;

@Injectable()
export class CharacterService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(data: Character) {
        return await this.prismaService.db.character.create({
            data: {
                id: data.name.toLowerCase(),
                name: data.name,
                temporaryHitPoints: 0,
                maxAmountOfHitPoints: data.hitPoints,
                hitPoints: data.hitPoints,
                classes: {
                    create: data.classes.map(classData => ({
                        name: classData.name,
                        hitDiceValue: classData.hitDiceValue,
                        classLevel: classData.classLevel
                    }))
                },
                stats: {
                    create: {
                        ...data.stats
                    }
                },
                items: {
                    create: data.items.map((itemData: Item) => ({
                        name: itemData.name,
                        modifier: {
                            create: {
                                affectedObject: itemData.modifier.affectedObject,
                                affectedValue: itemData.modifier.affectedValue,
                                value: itemData.modifier.value,
                            }
                        }
                    }))
                },
                defenses: {
                    create: data.defenses.map((defenseData: Defense) => ({
                        type: PrismaDefenseType[defenseData.type],
                        defense: PrismaDefenseStrength[defenseData.defense],
                    }))
                }
            }
        });
    }



    capitalizeFirstLetter(input: string): string {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }

    async read(id: string) {
        return await this.prismaService.db.character.findUnique({
            where: {
                id: id
            }
        });
    }

    async readNested(id: string, include: IncludedNestedValuesForCharacter) {
        return await this.prismaService.db.character.findUnique({
            where: {
                id: id
            },
            include: {
                ...include
            }
        });
    }

    async update(id: string, data: Partial<SupportedCharacterProps>) {
        const character = await this.read(id);
        return await this.prismaService.db.character.update({
            where: {
                id: id
            },
            data: {
                ...character,
                ...data
            }
        })
    }

    async delete(id: string) {
        return await this.prismaService.db.character.delete({
            where: {
                id: id
            }
        })
    }
}
