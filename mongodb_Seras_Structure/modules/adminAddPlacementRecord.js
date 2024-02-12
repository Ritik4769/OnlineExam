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
    studentjoiningdate: {
        type: String,
        require: true,
        trim: true
    },
    studentbatchnumber: {
        type: Number,
        required: true
    },
    studentbatchsession: {
        type: Number,
        required: true
    },
    studentpackage: {
        type: Number,
        required: true
    },
    studentimage: {
        type: String,
        required: false,
        trim: true
    }
})
const placementRecords = new mongoose.model('placementRecord', placementRecord);

export { placementRecords };