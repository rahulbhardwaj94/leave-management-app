import { Injectable, NotFoundException } from '@nestjs/common';
import { PartnersRepository } from '../repositories/partner.repository';
import { Partner } from '../schemas/partner.schema';
import { AppConstants } from 'src/constants/app.constant';
import { UpdatePartnerDto } from '../dto/updatePartner.dto';

@Injectable()
export class PartnersService {
  constructor(private readonly partnerRepo: PartnersRepository) {}

  /**
   * Creates a new partner in the system.
   *
   * @param partner - The partner object containing the necessary details to create a new partner.
   * @returns A promise that resolves to the created partner object.
   */
  async createPartner(partner: any) {
    return await this.partnerRepo.create(partner);
  }

  /**
   * Retrieves all partners from the repository.
   *
   * @returns {Promise<Partner[]>} A promise that resolves to an array of partners.
   */
  async findAllParnters(): Promise<Partner[]> {
    return await this.partnerRepo.findAll();
  }

  /**
   * Retrieves a partner by their unique identifier.
   *
   * @param partnerId - The unique identifier of the partner to retrieve.
   * @returns A promise that resolves to the partner object if found, or null if not found.
   */
  async findPartnerById(partnerId: number) {
    const partner = await this.partnerRepo.findOne({ partnerId });
    if (!partner) {
      throw new NotFoundException(AppConstants.PARTNER_NOT_FOUND_ERROR);
    }
    return partner;
  }

  /**
   * Updates a partner's information in the repository.
   *
   * @param partnerId - The unique identifier of the partner to be updated.
   * @param partner - An object containing the updated partner information.
   * @returns A promise that resolves to the updated partner object.
   */
  async updatePartner(partnerId: number, updatePartner: UpdatePartnerDto) {
    try {
      return await this.partnerRepo.findOneAndUpdate(
        { partnerId },
        updatePartner,
      );
    } catch (error) {
      throw new NotFoundException(
        `Error while updating partner ${partnerId} ${error}`,
      );
    }
  }
}
