import mongoose from 'mongoose';

const CompanyRecord = new mongoose.Schema({
    companyName: {
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
    companyImg: {
        type: String,
        required: false,
        trim: true
    }
})
const CompanyRecords = new mongoose.model('CompanyRecord', CompanyRecord);

export { CompanyRecords };