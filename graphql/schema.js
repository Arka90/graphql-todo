import { join } from "path";
import { readdirSync, readFileSync } from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers"; // We imported this

const gqlFiles = readdirSync(join(__dirname, "./typedefs"));

let typeDefs = "";

// mergin all type defs in  a single file
gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, "./typedefs", file), {
    encoding: "utf8",
  });
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
