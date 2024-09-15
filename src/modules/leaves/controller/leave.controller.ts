import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { LeaveService } from '../service/leave.service';
import { CreateLeaveDto } from '../dto/createLeave.dto';

@Controller('leaves')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post('/apply-leave')
  @UsePipes(new ValidationPipe({ transform: true }))
  async applyLeave(@Body() createLeaveReqBody: CreateLeaveDto) {
    const { partnerId, startDate, endDate, slots } = createLeaveReqBody;
    try {
      return await this.leaveService.addLeave(
        partnerId,
        startDate,
        endDate,
        slots,
      );
    } catch (error) {
      Logger.error(error);
      throw new Error(error.message);
    }
  }

  @Post('/approve-leave')
  async approveLeave(@Body() leaveId: string) {
    try {
      return await this.leaveService.approveLeave(leaveId);
    } catch (error) {
      Logger.error(error);
      throw new Error(error.message);
    }
  }

  @Post('/reject-leave')
  async rejectLeave(@Body() leaveId: string) {
    try {
      return await this.leaveService.denyLeave(leaveId);
    } catch (error) {
      Logger.error(error);
      throw new Error(error.message);
    }
  }
}
