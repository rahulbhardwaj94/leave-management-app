import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PartnersService } from '../service/partner.service';
import { Partner } from '../schemas/partner.schema';
import { CreatePartnerDto } from '../dto/createPartner.dto';
import { partnerIdDto } from '../dto/findPartner.dto';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  /**
   * Creates a new partner.
   *
   * @returns {Promise<Partner>} A promise that resolves to the created partner object.
   *
   * @throws {Error} If the partner creation fails.
   */
  @Post('/create-partner')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPartner(@Body() partner: CreatePartnerDto): Promise<Partner> {
    return await this.partnersService.createPartner(partner);
  }

  /**
   * Retrieves all partners from the service.
   *
   * @returns {Promise<Partner[]>} A promise that resolves to an array of partners.
   */
  @Get('/all')
  // async getAllPartners(): Promise<Partner[]> {
  async getAllPartners() {
    return await this.partnersService.findAllParnters();
  }

  /**
   * Retrieves a partner by their unique identifier.
   *
   * @param id - The unique identifier of the partner to retrieve.
   * @returns A promise that resolves to the partner object if found, or null if not found.
   */
  @Post('/:partnerId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOnePartner(@Param() params: partnerIdDto) {
    const partnerId = params.partnerId;
    return await this.partnersService.findPartnerById(partnerId);
  }
}
