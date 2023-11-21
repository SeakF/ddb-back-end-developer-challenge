import { Controller, Post, Param, Body, HttpStatus } from '@nestjs/common';
import { CalculateCharacterStatsService } from './calculate-character-stats/calculate-character-stats.service';
import { DefenseType as PrismaDefenseType } from '@prisma/client';
import { DealDamageDto, HealDto, AddTemporaryHitPointsDto } from './app.dto';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Controller()
export class AppController {
  constructor(private readonly calculateCharacterStatsService: CalculateCharacterStatsService) {}

  @Post('deal-damage/:id')
  async dealDamage(@Param('id') id: string, @Body() dealDamageDto: DealDamageDto) {
    const dtoObject = plainToClass(DealDamageDto, dealDamageDto);

    try {
      await validateOrReject(dtoObject);
      return await this.calculateCharacterStatsService.dealDamage(id, PrismaDefenseType[dealDamageDto.damageType], dealDamageDto.amount);
    } catch (e) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        error: e,
      }
    }
  }

  @Post('heal/:id')
  async heal(@Param('id') id: string, @Body() healDto: HealDto) {
    const dtoObject = plainToClass(HealDto, healDto);

    try {
      await validateOrReject(dtoObject);
      return await this.calculateCharacterStatsService.heal(id, healDto.amount);
    } catch (e) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        error: e,
      }
    }
  }

  @Post('add-temporary-hit-points/:id')
  async addTemporaryHitPoints(@Param('id') id: string, @Body() addTemporaryHitPointsDto: AddTemporaryHitPointsDto) {
    const dtoObject = plainToClass(AddTemporaryHitPointsDto, addTemporaryHitPointsDto);

    try {
      await validateOrReject(dtoObject);
      return await this.calculateCharacterStatsService.addTemporaryHitPoints(id, addTemporaryHitPointsDto.amount);
    } catch (e) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        error: e,
      }
    }
  }
}
