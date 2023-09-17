import { GraphQLError } from "graphql";
import { User } from "../../../db/models";
import Jwt from "jsonwebtoken";

const userMutation = {
  registerUser: async (_root, { name, email, dob, gender, password }) => {
    try {
      const existUser = await User.findOne({ email });

      if (existUser) throw new Error("User already exisits");

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
      throw new GraphQLError(error.message);
    }
  },

  loginUser: async (_root, { email, password }) => {
    try {
      const user = await User.findOne({ email });

      if (!user || !(await user.correctPassword(password, user.password)))
        throw new Error("Incorrect Email or Password");

      const data = { id: user._id, name: user.name, email: user.email };
      const token = Jwt.sign(data, process.env.JWT_SECRET);
      return { token, user };
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
};

export default userMutation;
