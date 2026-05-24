import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  message: z.string().min(10).max(5000),
  company: z.string().max(0).optional(),
});
