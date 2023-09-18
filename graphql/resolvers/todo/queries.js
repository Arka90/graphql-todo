import { GraphQLError } from "graphql";
import { Todo } from "../../../db/models";

const todoQueries = {
  getAllTodos: async () => {
    try {
      const todos = await Todo.find({});
      return todos;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
  getTodosByUser: async (_root, _args, { id }) => {
    try {
      if (!id) throw new Error("This action need sign in");
      const todos = await Todo.find({ user: id }).populate("user");
      return todos;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
};

export default todoQueries;
