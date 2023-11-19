import mongoose from 'mongoose';
const placementRecord = new mongoose.Schema({
    studentname: {
        type: String,
        required: true,
        trim: true
    },
    studentnumber: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    studentemail: {
        type: String,
        required: true,
        trim: true
    },
    studentcompanyname: {
        type: String,
        required: true,
        trim: true
    },
    studentimage: {
        type: String,
        required: false,
        trim: true
    }
})
const placementRecords = new mongoose.model('placementRecord', placementRecord);

export { placementRecords };