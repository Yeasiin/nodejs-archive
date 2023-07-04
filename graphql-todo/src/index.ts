import fs from "fs";
import { config } from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers";
import path from "path";
import { DBConnect } from "./utils/dbUtils";

// environment variable
config();

// database
DBConnect(process.env.MONGO_URI);

// keeping graphql Schema on the root is `important` as it will be used from src while development and from the dist after the production build
const typeDefs = fs.readFileSync(
  path.resolve(__dirname, "..", "graphql/schema.graphql"),
  {
    encoding: "utf-8",
  }
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = (process.env.PORT || 3000) as number;

startStandaloneServer(server, {
  listen: { port: PORT },
  context: async () => {
    return {
      name: "yeasin",
    };
  },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
