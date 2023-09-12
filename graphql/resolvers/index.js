import { testQueries } from "./Test";

const resolvers = {
  Query: {
    ...testQueries,
  },
  //Your Mutations go here
  // Mutation: {

  // },
};

export default resolvers;
