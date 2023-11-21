import { IsInt, IsNotEmpty, IsEnum, Min } from 'class-validator';
import { DefenseType } from './character/character.interface';

export class DealDamageDto {
    @IsInt()
    @IsNotEmpty()
    @Min(0, { message: 'value cannot be negative' })
    amount: number;

    @IsNotEmpty()
    @IsEnum(DefenseType)
    damageType: string
}

export class HealDto {
    @IsInt()
    @IsNotEmpty()
    @Min(0, { message: 'value cannot be negative' })
    amount: number
}

export class AddTemporaryHitPointsDto {
    @IsInt()
    @IsNotEmpty()
    @Min(0, { message: 'value cannot be negative' })
    amount: number;
}