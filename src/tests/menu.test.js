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
const menu_1 = require("../data/menu");
beforeEach(() => {
    menu_1.menuItems.length = 0;
    menu_1.menuItems.push(...menu_1.initialMenuItems);
});
describe("GET /menu", () => {
    it("should return an array of menu items", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get("/menu");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty("name");
    }));
});
describe("POST /menu", () => {
    it("should create a new menu item", () => __awaiter(void 0, void 0, void 0, function* () {
        const newItem = {
            name: "Test Pasta",
            price: 9.99,
            category: "Pasta",
            available: true,
        };
        const response = yield (0, supertest_1.default)(server_1.default).post("/menu").send(newItem);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Test Pasta");
    }));
    it("should fail with invalid data", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post("/menu").send({ name: "" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Validation error");
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
describe("DELETE /menu/:id", () => {
    it("should delete an existing menu item", () => __awaiter(void 0, void 0, void 0, function* () {
        // Create a new item to delete
        const createRes = yield (0, supertest_1.default)(server_1.default).post("/menu").send({
            name: "Focaccia",
            price: 6.0,
            category: "Appetizer",
            available: true,
        });
        const id = createRes.body.id;
        // Now delete it
        const deleteRes = yield (0, supertest_1.default)(server_1.default).delete(`/menu/${id}`);
        expect(deleteRes.status).toBe(200);
        expect(deleteRes.body.name).toBe("Focaccia");
        // Verify it no longer exists
        const getRes = yield (0, supertest_1.default)(server_1.default).get(`/menu/${id}`);
        expect(getRes.status).toBe(404);
    }));
    it("should return 404 when deleting a non-existent item", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).delete("/menu/999999");
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "Item not found");
    }));
});
