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
  user: {
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

// This is causing infinite call problem
// TodoSchema.pre(/^find/, function (next) {
//   this.populate("user");
//   next();
// });

const Todo = model("Todo", TodoSchema);

export default Todo;
