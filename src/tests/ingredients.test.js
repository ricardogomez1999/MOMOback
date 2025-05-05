"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const ingredients_1 = require("../data/ingredients");
beforeEach(() => {
    ingredients_1.ingredients.length = 0;
    ingredients_1.ingredients.push(...ingredients_1.initialIngredients);
});
describe("GET /ingredients", () => {
    it("should return an array of ingredients", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get("/ingredients");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0]).toHaveProperty("name");
    }));
});
describe("POST /ingredients", () => {
    it("should create a new ingredient with valid data", () => __awaiter(void 0, void 0, void 0, function* () {
        const newIngredient = {
            name: "Parmesan Cheese",
            stock_quantity: 5,
            unit: "kg",
        };
        const res = yield (0, supertest_1.default)(server_1.default).post("/ingredients").send(newIngredient);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.name).toBe("Parmesan Cheese");
    }));
    it("should return 400 for invalid ingredient data", () => __awaiter(void 0, void 0, void 0, function* () {
        const badIngredient = {
            name: "",
            stock_quantity: -10,
            unit: "",
        };
        const res = yield (0, supertest_1.default)(server_1.default).post("/ingredients").send(badIngredient);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("message", "Validation error");
        expect(res.body.errors).toHaveProperty("name");
        expect(res.body.errors).toHaveProperty("stock_quantity");
    }));
});
describe("PUT /ingredients/:id", () => {
    it("should update an existing ingredient", () => __awaiter(void 0, void 0, void 0, function* () {
        // First, create a new ingredient to update
        const createRes = yield (0, supertest_1.default)(server_1.default).post("/ingredients").send({
            name: "Mozzarella",
            stock_quantity: 10,
            unit: "kg",
        });
        const id = createRes.body.id;
        // Now update it
        const updateRes = yield (0, supertest_1.default)(server_1.default).put(`/ingredients/${id}`).send({
            stock_quantity: 25,
        });
        expect(updateRes.status).toBe(200);
        expect(updateRes.body.stock_quantity).toBe(25);
    }));
    it("should return 404 for non-existing ingredient", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).put("/ingredients/999999").send({
            stock_quantity: 5,
        });
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "Ingredient not found");
    }));
});
describe("DELETE /ingredients/:id", () => {
    it("should delete an existing ingredient", () => __awaiter(void 0, void 0, void 0, function* () {
        // First, create a new ingredient to delete
        const createRes = yield (0, supertest_1.default)(server_1.default).post("/ingredients").send({
            name: "Basil",
            stock_quantity: 1,
            unit: "bunch",
        });
        const id = createRes.body.id;
        // Now delete it
        const deleteRes = yield (0, supertest_1.default)(server_1.default).delete(`/ingredients/${id}`);
        expect(deleteRes.status).toBe(200);
        expect(deleteRes.body.name).toBe("Basil");
        // Ensure it's really gone
        const getRes = yield (0, supertest_1.default)(server_1.default).get(`/ingredients/${id}`);
        expect(getRes.status).toBe(404);
    }));
    it("should return 404 for deleting non-existing ingredient", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).delete("/ingredients/999999");
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "Ingredient not found");
    }));
});
describe("PUT /menu/:id", () => {
    it("should update an existing menu item", () => __awaiter(void 0, void 0, void 0, function* () {
        // Create a new menu item to update
        const createRes = yield (0, supertest_1.default)(server_1.default).post("/menu").send({
            name: "Garlic Bread",
            price: 4.5,
            category: "Appetizer",
            available: true,
        });
        const id = createRes.body.id;
        // Now update it
        const updateRes = yield (0, supertest_1.default)(server_1.default).put(`/menu/${id}`).send({
            price: 5.0,
            available: false,
        });
        expect(updateRes.status).toBe(200);
        expect(updateRes.body.price).toBe(5.0);
        expect(updateRes.body.available).toBe(false);
    }));
    it("should return 404 when updating non-existent menu item", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).put("/menu/999999").send({
            price: 10.0,
        });
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "Item not found");
    }));
});
