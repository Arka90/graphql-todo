import { port } from "./config/environment";
import app from "./app";
import apolloServer from "./graphql";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import connectDB from "./db";

async function getContext({ req }) {
  return { name: "Arka" };
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
