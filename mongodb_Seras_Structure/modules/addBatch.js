import mongoose from 'mongoose';
const batchRecord = new mongoose.Schema({
    batchName: {
        type: String,
        required: true,
        trim: true,
        default: "ITEP-Batch"
    },
    trainerName: {
        type: String,
        required: true,
        trim: true,
        default: "Not Added"
    },
    batchCenter: {
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
    endDate: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now()
    },
    batchImage: {
        type: String,
        required: false,
        trim: true
    }
})
const batchRecords = new mongoose.model('batchRecord', batchRecord);

export { batchRecords };
