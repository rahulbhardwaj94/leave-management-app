import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnersModule } from './modules/partners/partners.module';
import { LeavesModule } from './modules/leaves/leaves.module';
import { HealthModule } from './modules/health/health.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './exceptions/all.exception';
import { ResponseInterceptor } from './common/response/response.interceptor';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/newTest'),
    PartnersModule,
    LeavesModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
