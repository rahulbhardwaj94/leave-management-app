import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';

import { IMongooseGenericRepository } from '../../../abstracts/repository.abstract';
import { Leave, LeaveDocument } from '../schemas/leave.schema';

/**
 * Repository class for Leave data.
 * Extends IMongooseGenericRepository to provide generic CRUD operations.
 */
@Injectable()
export class LeaveRepository extends IMongooseGenericRepository<LeaveDocument> {
  /**
   * The parameterized constructor accepts a LeaveDocument model.
   * @param leaveModel The LeaveDocument model to be injected.
   */
  constructor(@InjectModel(Leave.name) leaveModel: Model<LeaveDocument>) {
    super(leaveModel);
  }
}
