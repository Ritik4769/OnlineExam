import mongoose from 'mongoose';

const facultyRecord = new mongoose.Schema({
    facultyname: {
        type: String,
        required: true,
        trim: true
    },
    linkedInid: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    facultyemail: {
        type: String,
        required: true,
        trim: true
    },
    joiningDate: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now()
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: false,
        trim: true
    },
    Skills: {
        type: String,
        required: true,
        trim: true
    }
})
const facultyRecords = new mongoose.model('facultyRecord', facultyRecord);

export { facultyRecords };
