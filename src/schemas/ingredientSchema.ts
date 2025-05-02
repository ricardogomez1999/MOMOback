import { z } from "zod";

export const ingredientSchema = z.object({
  name: z.string().min(2),
  stock_quantity: z.number().nonnegative(),
  unit: z.string().min(1),
});
