import mongoose from 'mongoose';

const Gallery = new mongoose.Schema({
    photoName: {
        type: String,
        required: true,
        trim: true,
        default: " "
    },
    photoHeading: {
        type: String,
        required: true,
        trim: true,
        default: "  "
    },
    photoDescription: {
        type: String,
        required: true,
        trim: true,
        default: "  "
    },
    category: {
        type: String,
        required: true,
        trim: true,
        default: "  "
    },
    uploadDate: {
        type: Date,
        trim: true,
        default: Date.now()
    },
    galleryImg: {
        type: String,
        required: false,
        trim: true
    }
})
const gallery = new mongoose.model('Gallery', Gallery);
export { gallery };