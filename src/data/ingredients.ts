import { Ingredient } from "../models/ingredient";

export const initialIngredients: Ingredient[] = [
  { id: 1, name: "Tomato Sauce", stock_quantity: 25, unit: "liters" },
  { id: 2, name: "Mozzarella Cheese", stock_quantity: 15, unit: "kg" },
  { id: 3, name: "Romaine Lettuce", stock_quantity: 8, unit: "kg" },
  { id: 4, name: "Basil", stock_quantity: 12, unit: "bunches" },
];

export let ingredients: Ingredient[] = [...initialIngredients];
