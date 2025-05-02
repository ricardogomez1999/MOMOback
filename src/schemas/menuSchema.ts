import { z } from "zod";

export const menuItemSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  category: z.string().min(2),
  available: z.boolean(),
});
