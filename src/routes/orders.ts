import { Router } from "express";
import { createOrder } from "../controllers/orderController";
import { validate } from "../middleware/validate";
import { orderSchema } from "../schemas/orderSchema";
import { getOrders } from "../controllers/orderController";
import { updateOrder } from "../controllers/orderController";

const router = Router();

router.post("/", validate(orderSchema), createOrder);
router.get("/", getOrders);
router.put("/:id", validate(orderSchema.partial()), updateOrder);

export default router;
