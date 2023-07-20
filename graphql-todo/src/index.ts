import fs from "fs";
import { config } from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import path from "path";
import { resolvers } from "./resolvers";
import { DBConnect } from "./utils/dbUtils";
import Task from "./model/Task";

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

export type MyContext = {
  db: {
    Task: typeof Task;
  };
};

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const PORT = (process.env.PORT || 3000) as number;

startStandaloneServer(server, {
  listen: { port: PORT },
  context: async () => ({
    db: {
      Task: Task,
    },
  }),
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
