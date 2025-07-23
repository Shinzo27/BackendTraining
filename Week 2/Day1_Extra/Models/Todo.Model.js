import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        required:true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Todos = mongoose.model('Todos', TodoSchema);

export default Todos