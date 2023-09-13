import { testQueries } from "./Test";
import { testMutation } from "./Test";
const resolvers = {
  Query: {
    ...testQueries,
  },
  //Your Mutations go here
  Mutation: {
    ...testMutation,
  },
};

export default resolvers;
