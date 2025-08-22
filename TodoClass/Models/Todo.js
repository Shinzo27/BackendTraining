import { Schema, model } from "mongoose"; // Erase if already required

var todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  status: {
    type: String,
    required: true,
    unique: true,
  },
});

const todo = model("Todo", todoSchema);

export default todo;
