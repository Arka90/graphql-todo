import { GraphQLError } from "graphql";
import { User } from "../../../db/models";
import Jwt from "jsonwebtoken";

const userMutation = {
  registerUser: async (_root, { name, email, dob, gender, password }) => {
    try {
      const existUser = await User.findOne({ email });

      if (existUser) throw new Error();

      const user = await User.create({
        name,
        email,
        dob,
        gender,
        password,
      });

      const data = { id: user._id, name: user.name, email: user.email };
      const token = Jwt.sign(data, process.env.JWT_SECRET);
      return { token, user };
    } catch (error) {
      throw new GraphQLError("Internal server error");
    }
  },
};

export default userMutation;
