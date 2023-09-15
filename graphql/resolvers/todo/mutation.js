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
        userId: user._id,
      });
      user.todos.push(todo._id);
      user.save();
      return todo;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
};

export default todoMutation;
