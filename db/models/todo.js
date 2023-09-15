import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
  title: {
    type: String,
    required: [true, "Todos must have an description"],
  },
  description: {
    type: String,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },

  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const Todo = model("Todo", TodoSchema);

export default Todo;
