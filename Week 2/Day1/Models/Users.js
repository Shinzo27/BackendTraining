import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    id: {
        type: String
    },
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});

export default model('User', userSchema);