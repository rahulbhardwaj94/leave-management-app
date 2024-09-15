import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TimeSlot } from '../../partners/schemas/partner.schema';

export type LeaveDocument = Leave & Document;

@Schema()
export class Leave {
  @Prop({ type: Types.ObjectId, ref: 'Partner', required: true })
  partner: Types.ObjectId; // Reference to the partner

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: false })
  endDate?: Date; // Optional end date for multi-day leaves

  @Prop({ type: [TimeSlot], required: false })
  slots?: TimeSlot[]; // Optional slots for single-day leaves

  @Prop({
    required: true,
    enum: ['PENDING', 'APPROVED', 'DENIED'],
    default: 'PENDING',
  })
  status: string;

  @Prop({ required: true, default: Date.now })
  appliedDate: Date;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);
