import { Module } from '@nestjs/common';
import { LeaveService } from './service/leave.service';
import { LeaveController } from './controller/leave.controller';
import { LeaveRepository } from './repository/leave.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaveSchema } from './schemas/leave.schema';
import { PartnerSchema } from '../partners/schemas/partner.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Leave', schema: LeaveSchema },
      { name: 'Partner', schema: PartnerSchema },
    ]),
  ],
  controllers: [LeaveController],
  providers: [LeaveService, LeaveRepository],
})
export class LeavesModule {}
