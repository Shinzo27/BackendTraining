import { Schema, model } from 'mongoose'; 

const BookSchema = new Schema({
    bookId: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    bookName: {
        type: String,
        required: true
    },
    bookDesc: {
        type: String,
        required: true
    },
    bookAuthor: {
        type: String,
        required: true
    },
    noOfPage: {
        type: Number,
        required: true
    },
    bookCategory: {
        type: String,
        required: true
    },
    bookPrice: {
        type: Number,
        required: true
    },
    releasedYear: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Books = model('Books', BookSchema);

export default Books