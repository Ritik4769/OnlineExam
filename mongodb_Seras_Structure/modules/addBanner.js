import mongoose from 'mongoose';
const bannerRecord = new mongoose.Schema({
    bannerName: {
        type: String,
        required: true,
        trim: true,
        default: "ITEP-Batch"
    },
    uploadDate: {
        type: Date,
        trim: true,
        default: Date.now()
    },
    bannerImg: {
        type: String,
        required: false,
        trim: true
    }
})
const bannerRecords = new mongoose.model('bannerRecord', bannerRecord);

export { bannerRecords };
