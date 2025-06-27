// needed to create Zod object schemas for validation
import { z } from "zod";

// create a Zod schema for login validation
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required"),
});

// create a Zod schema for registration validation
export const registerSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  email: z.string().email(),
  password: z.string().min(8, "Minimum of 8 characters required"),
});