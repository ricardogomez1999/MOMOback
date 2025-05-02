import { Router } from "express";
import {
  getAllIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "../controllers/ingredientController";
import { validate } from "../middleware/validate";
import { ingredientSchema } from "../schemas/ingredientSchema";

const router = Router();

router.get("/", getAllIngredients);
router.get("/:id", getIngredientById);
router.post("/", validate(ingredientSchema), createIngredient);
router.put("/:id", validate(ingredientSchema.partial()), updateIngredient);
router.delete("/:id", deleteIngredient);

export default router;
