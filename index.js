import { port } from "./config/environment";
import app from "./app";
import apolloServer from "./graphql";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import connectDB from "./db";

async function getContext({ req }) {
  if (req.auth) {
    const { id, name, email } = req.auth;
    return { id, name, email };
  } else {
    return {};
  }
}

const start = async () => {
  try {
    app.listen(port);
    await apolloServer.start();
    await connectDB();
    app.use(
      "/graphql",
      apolloMiddleware(apolloServer, { context: getContext })
    );
    console.log("Connected to database");
    console.log(
      `🚀 GraphQL server running at port: ${port}, Click the link below to open sandbox`
    );
    console.log(`http://localhost:${port}/graphql`);
  } catch (err) {
    console.log(err);
    console.log("Not able to run GraphQL server");
  }
};

start();
