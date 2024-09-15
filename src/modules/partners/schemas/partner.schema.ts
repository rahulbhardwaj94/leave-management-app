import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// This interface represents a Partner document in MongoDB
export type PartnerDocument = Partner & Document;

@Schema()
export class TimeSlot {
  @Prop({ required: true })
  start: string; // Start time (e.g., '08:00')

  @Prop({ required: true })
  end: string; // End time (e.g., '12:00')
}

@Schema()
export class Schedule {
  @Prop({
    required: true,
    enum: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
  })
  day: string; // Day of the week

  @Prop({ type: [TimeSlot], required: true })
  slots: TimeSlot[]; // Array of time slots for this day
}

@Schema()
export class Partner {
  @Prop({ required: true })
  partnerName: string;

  @Prop({ required: true, unique: true })
  partnerId: number;

  @Prop({ type: [Schedule], required: true })
  schedule: Schedule[];
}

// Generate a schema for the Partner model
export const PartnerSchema = SchemaFactory.createForClass(Partner);
