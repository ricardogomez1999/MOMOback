"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientSchema = void 0;
const zod_1 = require("zod");
exports.ingredientSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    stock_quantity: zod_1.z.number().nonnegative(),
    unit: zod_1.z.string().min(1),
});
