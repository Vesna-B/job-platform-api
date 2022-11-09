import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdsController } from './ads.controller';
import { JobAdSchema } from './ads.model';
import { AdsService } from './ads.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'JobAd', schema: JobAdSchema, collection: 'ads' }])
  ],
  controllers: [AdsController],
  providers: [AdsService]
})
export class AdsModule {}
