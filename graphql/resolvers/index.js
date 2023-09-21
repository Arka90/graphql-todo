import { userMutation, userQueries } from "./user";
import { todoMutation, todoQueries } from "./todo";
const resolvers = {
  Query: {
    ...userQueries,
    ...todoQueries,
  },

  Mutation: {
    ...userMutation,
    ...todoMutation,
  },
};

export default resolvers;
