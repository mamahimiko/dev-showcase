import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Zod says incorrect email pattern."),
  password: z.string().min(5, "Zod says not! passwords must be 5 characters!"),
});

export const signUpSchema = z.object({
  email: z.email("Zod says incorrect email pattern."),
  password: z.string().min(5, "Zod says not! passwords must be 5 characters!"),
  username: z.string().min(6, "You need at least 6 characters!"),
  career: z.string("Please put in!"),
});

export const postSchema = z.object({
  title: z.string().min(6, "Your title must be at least 6 characters long"),
  content: z.string().optional(),
  category: z.string("Please put in!"),
  image: z.instanceof(FormData).optional(),
});
