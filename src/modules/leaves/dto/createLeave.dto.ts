import {
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsArray,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateLeaveDto {
  @IsNotEmpty()
  @IsNumber({}, { message: 'partnerId should be a number' })
  partnerId: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsOptional()
  @IsArray()
  slots?: any[]; // Validate the slots format further if needed

  @IsOptional()
  @IsBoolean()
  isMultipleDaysSelected: boolean = false; // Default value set to false
}
