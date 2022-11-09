import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdsModule } from './ads/ads.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://MyMDBUser:BuCcmShpTURbjMmu@projekat.335ya.mongodb.net/job-ads?retryWrites=true&w=majority'),
    AdsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
