import { createEnv } from "@t3-oss/env-nextjs";
import type { ZodError } from "zod";

export const env = createEnv({
  isServer: typeof window === "undefined",
  emptyStringAsUndefined: true,
  server: {
    // ex:
    // DATABASE_URL: z.string().url(),
    // OPEN_AI_API_KEY: z.string().min(1),
  },
  client: {
    // ex:
    // NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {
    // ex:
    // NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  },
  onValidationError: (error: ZodError) => {
    console.error("❌ Invalid environment variables:", error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  },
  // Called when server variables are accessed on the client.
  onInvalidAccess: (variable: string) => {
    throw new Error(`❌ Attempted to access a server-side environment variable on the client (${variable})`);
  },
});
