import * as mongoose from "mongoose";


export const JobAdSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    skills: [{
        type: String
    }],
    isPublished: { type: Boolean, required: true }
})


export interface JobAd {
    title: string;
    description: string;
    skills: string[];
    isPublished: boolean;
}

