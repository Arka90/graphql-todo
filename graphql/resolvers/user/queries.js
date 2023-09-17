import { GraphQLError } from "graphql";
import { User } from "../../../db/models";

const userQueries = {
  getUsers: async () => {
    try {
      const users = await User.find({});
      return users;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
  getUser: async (_root, { id }) => {
    try {
      const user = await User.findOne({ _id: id });
      if (!user) throw new Error("Need to login");

      return user;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
};

export default userQueries;
