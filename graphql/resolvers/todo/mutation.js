import { GraphQLError } from "graphql";
import { User } from "../../../db/models";
import { Todo } from "../../../db/models";

const todoMutation = {
  createTodo: async (_root, { title, description }, { id }) => {
    try {
      const user = await User.findOne({ _id: id });
      if (!user) throw new Error("No user found");

      const todo = await Todo.create({
        title,
        description,
        user: user._id,
      });
      user.todos.push(todo._id);
      user.updatedAt = new Date();
      user.save();
      return todo;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
  editTodo: async (_root, params, { id }) => {
    try {
      const user = await User.findOne({ _id: id });
      if (!user) throw new Error("No user found");

      const todo = await Todo.findOneAndUpdate({ _id: params._id }, params, {
        new: true,
      });

      if (!todo) throw new Error("Invalid todo id");

      return todo;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },

  deleteTodo: async (_root, { todoId }, { id }) => {
    try {
      const user = await User.findOne({ _id: id });
      if (!user) throw new Error("No user found");
      const todo = await Todo.findOneAndDelete({ _id: todoId });
      user.todos = user.todos.filter((todo) => todo._id != todoId);
      user.updatedAt = new Date();
      user.save();

      return "data deleted";
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
};

export default todoMutation;
