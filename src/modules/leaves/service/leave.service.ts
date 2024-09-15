import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leave, LeaveDocument } from '../schemas/leave.schema';
import {
  Partner,
  PartnerDocument,
} from '../../partners/schemas/partner.schema';
import { AppConstants } from 'src/constants/app.constant';
import { LeaveRepository } from '../repository/leave.repository';
import * as moment from 'moment';

@Injectable()
export class LeaveService {
  constructor(
    @InjectModel(Leave.name) private leaveModel: Model<LeaveDocument>,
    @InjectModel(Partner.name) private partnerModel: Model<PartnerDocument>,
    private readonly leaveRepo: LeaveRepository,
  ) {}

  // Add a new leave and check for overlaps
  async addLeave(
    partnerId: number,
    startDate: Date,
    endDate?: Date,
    slots?: any[],
  ): Promise<Leave> {
    try {
      // Check for overlapping leaves
      await this.isLeaveOverlapping(partnerId, startDate, endDate);

      // Create a new leave
      return await this.leaveRepo.create({
        partner: partnerId,
        startDate,
        endDate,
        slots,
        status: 'PENDING',
      });
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException(error);
    }
  }

  // Helper method to check for overlapping leaves
  async isLeaveOverlapping(partnerId: number, startDate: Date, endDate?: Date) {
    const previousLeave = await this.leaveRepo.find({
      partner: partnerId,
    });

    let isOverlapping = false;

    const newStartDate = moment(new Date(startDate), 'YYYY-MM-DD HH:MM').unix();
    const newEndDate = moment(new Date(endDate), 'YYYY-MM-DD HH:MM').unix();

    for (const leave of previousLeave) {
      const leaveStartDate = moment(
        new Date(leave.startDate),
        'YYYY-MM-DD HH:MM',
      ).unix();
      const leaveEndDate = moment(
        new Date(leave.endDate),
        'YYYY-MM-DD HH:MM',
      ).unix();
      if (leaveStartDate <= newStartDate && leaveEndDate >= newStartDate) {
        isOverlapping = true;
        break;
      }
      if (leaveStartDate <= newEndDate && leaveEndDate >= newEndDate) {
        isOverlapping = true;
        break;
      }
      if (leaveStartDate >= newStartDate && leaveEndDate <= newEndDate) {
        isOverlapping = true;
        break;
      }
    }

    if (isOverlapping) {
      throw new BadRequestException(AppConstants.LEAVE_OVERLAP_ERROR);
    }
    return;
  }

  /**
   * Approves a leave request by updating its status to approved.
   *
   * @param leaveId - The unique identifier of the leave request to be approved.
   * @returns A promise that resolves to the updated Leave object.
   * @throws BadRequestException if the leave request is not found.
   */
  async approveLeave(leaveId: string): Promise<Leave> {
    const leave = await this.leaveModel.findById(leaveId);
    if (!leave) {
      throw new BadRequestException(`Leave not found with leaveId ${leaveId}`);
    }

    leave.status = AppConstants.LEAVE_STATUS.APPROVED;
    return leave.save();
  }

  /**
   * Denies a leave request by updating its status to DENIED.
   *
   * @param leaveId - The unique identifier of the leave request to be denied.
   * @returns A promise that resolves to the updated Leave object.
   * @throws BadRequestException if the leave request is not found.
   */
  async denyLeave(leaveId: string): Promise<Leave> {
    const leave = await this.leaveModel.findById(leaveId);
    if (!leave) {
      throw new BadRequestException(`Leave not found with leaveId ${leaveId}`);
    }

    leave.status = AppConstants.LEAVE_STATUS.DENIED;
    return leave.save();
  }
}
