"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = exports.orderItemSchema = void 0;
const zod_1 = require("zod");
exports.orderItemSchema = zod_1.z.object({
    menuItemId: zod_1.z.number().int().positive(),
    quantity: zod_1.z.number().int().positive(),
});
exports.orderSchema = zod_1.z.object({
    items: zod_1.z.array(exports.orderItemSchema).min(1),
    totalAmount: zod_1.z.number().positive(),
    timestamp: zod_1.z.string().datetime(),
    tableNumber: zod_1.z.number().int().positive().optional(),
    customerName: zod_1.z.string().min(1).optional(),
    status: zod_1.z.enum(["pending", "completed", "cancelled"]).optional(),
    paymentMethod: zod_1.z.enum(["cash", "card", "transfer", "mobile"]),
});
