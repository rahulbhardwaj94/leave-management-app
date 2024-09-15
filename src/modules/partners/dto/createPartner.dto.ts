import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsEnum,
  IsDefined,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TimeSlotDto {
  @IsString()
  @IsNotEmpty()
  start: string;

  @IsString()
  @IsNotEmpty()
  end: string;
}

export class ScheduleDto {
  @IsEnum([
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ])
  @IsNotEmpty()
  day: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1) // Ensure there is at least one slot per day
  @Type(() => TimeSlotDto)
  slots: TimeSlotDto[];
}

export class CreatePartnerDto {
  @IsNotEmpty({ message: 'partnerName can not be empty' })
  @IsString({ message: 'partnerName name should be a string' })
  @IsDefined({ message: 'partnerName name is required' })
  partnerName: string;

  @IsNumber({}, { message: 'partnerId should be a number' })
  @IsNotEmpty({ message: 'partnerId can not be empty' })
  partnerId: number;

  @IsArray({ message: 'schedule should be an array' })
  @ValidateNested({ each: true })
  @ArrayMinSize(1) // Ensure there's at least one day in the schedule
  @Type(() => ScheduleDto)
  schedule: ScheduleDto[];
}

// Example usage:

/*
{
  "name": "John Doe",
  "partnerId": "partner123",
  "schedule": [
    {
      "day": "Monday",
      "slots": [
        { "start": "08:00", "end": "12:00" },
        { "start": "13:00", "end": "17:00" }
      ]
    },
    {
      "day": "Tuesday",
      "slots": [
        { "start": "09:00", "end": "12:00" }
      ]
    }
  ]
}
*/
