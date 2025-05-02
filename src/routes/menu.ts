import { Router } from "express";
import {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController";
import { validate } from "../middleware/validate";
import { menuItemSchema } from "../schemas/menuSchema";

const router = Router();

router.get("/", getAllMenuItems);
router.get("/:id", getMenuItemById);
router.post("/", validate(menuItemSchema), createMenuItem);
router.put("/:id", validate(menuItemSchema.partial()), updateMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;
