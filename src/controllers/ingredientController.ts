import { Request, Response } from "express";
import { ingredients } from "../data/ingredients";
import { Ingredient } from "../models/ingredient";

export const getAllIngredients = (req: Request, res: Response) => {
  res.json(ingredients);
};

export const getIngredientById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const ingredient = ingredients.find((i) => i.id === id);

  if (ingredient) {
    res.json(ingredient);
  } else {
    res.status(404).json({ message: "Ingredient not found" });
  }
};

export const createIngredient = (req: Request, res: Response) => {
  const newIngredient: Ingredient = {
    id: Date.now(),
    ...req.body,
  };
  ingredients.push(newIngredient);
  res.status(201).json(newIngredient);
};

export const updateIngredient = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const index = ingredients.findIndex((i) => i.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Ingredient not found" });
    return;
  }

  ingredients[index] = { ...ingredients[index], ...req.body };
  res.json(ingredients[index]);
};

export const deleteIngredient = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const index = ingredients.findIndex((i) => i.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Ingredient not found" });
    return;
  }

  const deleted = ingredients.splice(index, 1);
  res.json(deleted[0]);
};
