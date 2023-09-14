import { GraphQLError } from "graphql";
import { User } from "../../../db/models";

const userQueries = {
  getUsers: async () => {
    try {
      const users = await User.find({});
      return users;
    } catch (error) {}
  },
  getUser: async (_root, { id }) => {
    try {
      const user = await User.findOne({ _id: id });
      if (!user) throw new Error("Error");

      return user;
    } catch (error) {
      throw new GraphQLError("No user found");
    }
  },
};

export default userQueries;
