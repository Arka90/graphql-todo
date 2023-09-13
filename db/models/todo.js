import { Schema, model } from "mongoose";

const TodoSchema = new Schema({});

const Todo = model("Todo", TodoSchema);

export default Todo;
