import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { JobAd } from './ads.model';

@Injectable()
export class AdsService {

    constructor(
        @InjectModel('JobAd') private readonly jobAdModel: Model<JobAd & Document>
    ) {}


    async findAllAds(search?: string, isPublished?: boolean) {
        try {
            let queryDb = {}

            if (search) { queryDb = { ...queryDb, title: { $regex: new RegExp(search, 'i') } } }
            if (isPublished !== null) { queryDb = { ...queryDb, isPublished } }

            let results = await this.jobAdModel.find(queryDb);
            return results

        } catch (error) {
            throw (error);
        }
    }

    create(ad: JobAd) {
        return new this.jobAdModel(ad).save();
    }


    async update(id: string, ad: JobAd) {
        const count = await this.jobAdModel.countDocuments({ title: ad.title })
        
        if (count > 0) {
            const adWithSameTitle = await this.jobAdModel.findOne({ title: ad.title })
            
            if (adWithSameTitle._id.toString() !== id) {
                throw new BadRequestException();
            }
        }

        return this.jobAdModel.findByIdAndUpdate(id, ad)
    }
    
    updateStatus(id: string, isPublished: boolean) {
        return this.jobAdModel.findByIdAndUpdate(id, { isPublished })
    }


    findById(id: string) {
        return this.jobAdModel.findOne({ _id: id })
    }

    delete(id: string) {
        return this.jobAdModel.findByIdAndDelete({ _id: id })
    }
}
