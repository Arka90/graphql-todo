import { testQueries, testMutation } from "./Test";
import { userMutation, userQueries } from "./user";
import { todoMutation } from "./todo";
const resolvers = {
  Query: {
    ...testQueries,
    ...userQueries,
  },
  //Your Mutations go here
  Mutation: {
    ...testMutation,
    ...userMutation,
    ...todoMutation,
  },
};

export default resolvers;
