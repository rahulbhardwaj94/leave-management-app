import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTimeSlotDto {
  @IsString()
  @IsOptional()
  start?: string; // e.g., '08:00'

  @IsString()
  @IsOptional()
  end?: string; // e.g., '12:00'
}

export class UpdateScheduleDto {
  @IsEnum([
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ])
  @IsOptional()
  day?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => UpdateTimeSlotDto)
  @IsOptional()
  slots?: UpdateTimeSlotDto[];
}

export class UpdatePartnerDto {
  @IsString()
  @IsOptional()
  partnerName?: string;

  @IsString()
  @IsOptional()
  partnerId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => UpdateScheduleDto)
  @IsOptional()
  schedule?: UpdateScheduleDto[];
}
