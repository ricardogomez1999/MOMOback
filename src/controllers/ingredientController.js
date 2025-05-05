"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIngredient = exports.updateIngredient = exports.createIngredient = exports.getIngredientById = exports.getAllIngredients = void 0;
const ingredients_1 = require("../data/ingredients");
const getAllIngredients = (req, res) => {
    res.json(ingredients_1.ingredients);
};
exports.getAllIngredients = getAllIngredients;
const getIngredientById = (req, res) => {
    const id = parseInt(req.params.id);
    const ingredient = ingredients_1.ingredients.find((i) => i.id === id);
    if (ingredient) {
        res.json(ingredient);
    }
    else {
        res.status(404).json({ message: "Ingredient not found" });
    }
};
exports.getIngredientById = getIngredientById;
const createIngredient = (req, res) => {
    const newIngredient = Object.assign({ id: Date.now() }, req.body);
    ingredients_1.ingredients.push(newIngredient);
    res.status(201).json(newIngredient);
};
exports.createIngredient = createIngredient;
const updateIngredient = (req, res) => {
    const id = parseInt(req.params.id);
    const index = ingredients_1.ingredients.findIndex((i) => i.id === id);
    if (index === -1) {
        res.status(404).json({ message: "Ingredient not found" });
        return;
    }
    ingredients_1.ingredients[index] = Object.assign(Object.assign({}, ingredients_1.ingredients[index]), req.body);
    res.json(ingredients_1.ingredients[index]);
};
exports.updateIngredient = updateIngredient;
const deleteIngredient = (req, res) => {
    const id = parseInt(req.params.id);
    const index = ingredients_1.ingredients.findIndex((i) => i.id === id);
    if (index === -1) {
        res.status(404).json({ message: "Ingredient not found" });
        return;
    }
    const deleted = ingredients_1.ingredients.splice(index, 1);
    res.json(deleted[0]);
};
exports.deleteIngredient = deleteIngredient;
