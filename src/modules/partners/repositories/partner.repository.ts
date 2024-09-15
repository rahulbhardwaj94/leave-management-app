import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';

import { IMongooseGenericRepository } from '../../../abstracts/repository.abstract';
import { Partner, PartnerDocument } from '../schemas/partner.schema';

/**
 * Repository class for Partner data.
 * Extends IMongooseGenericRepository to provide generic CRUD operations.
 */
@Injectable()
export class PartnersRepository extends IMongooseGenericRepository<PartnerDocument> {
  /**
   * The parameterized constructor accepts a PartnerDocument model.
   * @param partnerModel The PartnerDocument model to be injected.
   */
  constructor(@InjectModel(Partner.name) partnerModel: Model<PartnerDocument>) {
    super(partnerModel);
  }
}
