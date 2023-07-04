import { z } from "zod";

const envVariable = z.object({
  PORT: z.string(),
  MONGO_URI: z.string(),
});

envVariable.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariable> {}
  }
}
