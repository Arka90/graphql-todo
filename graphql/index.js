import { ApolloServer } from "@apollo/server";
import { env } from "../config/environment";
import schema from "./schema";
const apolloServer = new ApolloServer({
  // Schema pending...
  schema,
  playground: env.development,
});

export default apolloServer;
