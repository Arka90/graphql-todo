import { testQueries, testMutation } from "./Test";
import { userMutation, userQueries } from "./user";

const resolvers = {
  Query: {
    ...testQueries,
    ...userQueries,
  },
  //Your Mutations go here
  Mutation: {
    ...testMutation,
    ...userMutation,
  },
};

export default resolvers;
