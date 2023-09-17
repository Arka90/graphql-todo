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
};

export default todoQueries;
