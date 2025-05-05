"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemSchema = void 0;
const zod_1 = require("zod");
exports.menuItemSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    price: zod_1.z.number().positive(),
    category: zod_1.z.string().min(2),
    available: zod_1.z.boolean(),
});
