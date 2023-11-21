import { IsString, IsInt, IsArray, IsObject, ValidateNested, IsNotEmpty, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { DefenseType, DefenseStrength } from './character.interface';

class StatsDto {
    @IsNotEmpty()
    @IsInt()
    strength: number;
  
    @IsNotEmpty()
    @IsInt()
    dexterity: number;
  
    @IsNotEmpty()
    @IsInt()
    constitution: number;
  
    @IsNotEmpty()
    @IsInt()
    intelligence: number;
  
    @IsNotEmpty()
    @IsInt()
    wisdom: number;
  
    @IsNotEmpty()
    @IsInt()
    charisma: number;
  }

class ClassDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsInt()
    hitDiceValue: number;

    @IsNotEmpty()
    @IsInt()
    classLevel: number;
}

class ModifierDto {
    @IsNotEmpty()
    @IsString()
    affectedObject: string;

    @IsNotEmpty()
    @IsString()
    affectedValue: string;

    @IsNotEmpty()
    @IsInt()
    value: number;
}


class ItemDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => ModifierDto)
    modifier: ModifierDto;
}

class DefenseDto {
    @IsNotEmpty()
    @IsEnum(DefenseType)
    type: DefenseType

    @IsNotEmpty()
    @IsEnum(DefenseStrength)
    defense: DefenseStrength
}

export class CharacterDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsInt()
    level: number;
  
    @IsNotEmpty()
    @IsInt()
    hitPoints: number;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ClassDto)
    classes: ClassDto[];
  
    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => StatsDto)
    stats: StatsDto;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    items: ItemDto[];
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DefenseDto)
    defenses: DefenseDto[];
}