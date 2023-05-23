import { any, z } from "zod";

const envVariable = z.object({
  MONGO_URI: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.number(),
  NODE_ENV: z.string(),
});

envVariable.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariable> {}
  }
}
