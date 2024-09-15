import { Module } from '@nestjs/common';
import { PartnersController } from './controller/partner.controller';
import { PartnersService } from './service/partner.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnerSchema } from './schemas/partner.schema';
import { PartnersRepository } from './repositories/partner.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Partner', schema: PartnerSchema }]),
  ],
  controllers: [PartnersController],
  providers: [PartnersService, PartnersRepository],
})
export class PartnersModule {}
