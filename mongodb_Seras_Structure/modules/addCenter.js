import mongoose from 'mongoose';
const centerRecord = new mongoose.Schema({
    centerName: {
        type: String,
        required: true,
        trim: true,
        default: "ITEP-Batch"
    },
    managerName: {
        type: String,
        required: true,
        trim: true,
        default: "Not Added"
    },
    address: {
        type: String,
        required: true,
        trim: true,
        default: "Not Added"
    },
    
    startDate: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now()
    },
    centerImage: {
        type: String,
        required: false,
        trim: true
    }
})
const centerRecords = new mongoose.model('centerRecord', centerRecord);

export { centerRecords };
