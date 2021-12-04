// import { Schema, model } from 'mongoose';
import pkg from 'mongoose';
const { Schema, model } = pkg;
export const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})

export const Book = model('Book', BookSchema)
