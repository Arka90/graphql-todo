// In this file we are going to configure our whole app
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

// we can set enviroment here
const env = {
  development: process.env.NODE_ENV === "development",
  test: process.env.NODE_ENV === "test",
  production: process.env.NODE_ENV === "production",
};

// we can have different Url for different enviroment
const mongo = {
  url: process.env.MONGO_URI,
};

export { port, env, mongo };
