import { z } from "zod";

const envVariable = z.object({
  MONGO_URI: z.string(),
  JWT_SECRET: z.string(),
});

envVariable.parse(process.env);
// adding types to the process.env
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariable> {}
  }
}
