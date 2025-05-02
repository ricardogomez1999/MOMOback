import { z } from "zod";

export const orderItemSchema = z.object({
  menuItemId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

export const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1),
  totalAmount: z.number().positive(),
  timestamp: z.string().datetime(),
  tableNumber: z.number().int().positive().optional(),
  customerName: z.string().min(1).optional(),
  status: z.enum(["pending", "completed", "cancelled"]).optional(),
  paymentMethod: z.enum(["cash", "card", "transfer", "mobile"]),
});
