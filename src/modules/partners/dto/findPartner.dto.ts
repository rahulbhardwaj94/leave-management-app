// create a dto for fetching bulk docs from db which takes only employeeId as input which is a number.

import { Transform } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

/**
 * Data transfer object for partnerIdDto.
 */
export class partnerIdDto {
  /**
   * The partner ID.
   */
  @IsNotEmpty({ message: 'partnerId can not be empty' })
  @IsNumber({}, { message: 'partnerId should be a number' })
  @IsDefined({ message: 'partnerId is required' })
  @Transform(({ value }) => parseInt(value))
  partnerId: number;
}
