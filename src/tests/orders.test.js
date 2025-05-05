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
const orders_1 = require("../data/orders");
beforeEach(() => {
    orders_1.orders.length = 0;
    orders_1.orders.push(...orders_1.initialOrders);
});
describe("POST /orders", () => {
    it("should create a valid order", () => __awaiter(void 0, void 0, void 0, function* () {
        const newOrder = {
            items: [
                { menuItemId: 1, quantity: 2 },
                { menuItemId: 2, quantity: 1 },
            ],
            totalAmount: 27.5,
            timestamp: new Date().toISOString(),
            paymentMethod: "card",
        };
        const res = yield (0, supertest_1.default)(server_1.default).post("/orders").send(newOrder);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.items.length).toBe(2);
    }));
    it("should reject an invalid order", () => __awaiter(void 0, void 0, void 0, function* () {
        const badOrder = {
            items: [],
            totalAmount: -5,
            timestamp: "not-a-date",
            paymentMethod: "cheque",
        };
        const res = yield (0, supertest_1.default)(server_1.default).post("/orders").send(badOrder);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Validation error");
        expect(res.body.errors).toHaveProperty("items");
        expect(res.body.errors).toHaveProperty("totalAmount");
        expect(res.body.errors).toHaveProperty("timestamp");
        expect(res.body.errors).toHaveProperty("paymentMethod");
    }));
});
describe("GET /orders with filters", () => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const year = new Date().getFullYear();
    const month = today.slice(0, 7);
    it("should return orders by day", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get(`/orders?day=${today}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }));
    it("should return orders by month", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get(`/orders?month=${month}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }));
    it("should return orders by year", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get(`/orders?year=${year}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }));
});
describe("PUT /orders/:id", () => {
    it("should update an existing order status", () => __awaiter(void 0, void 0, void 0, function* () {
        // Create a new order to update
        const createRes = yield (0, supertest_1.default)(server_1.default)
            .post("/orders")
            .send({
            items: [{ menuItemId: 1, quantity: 1 }],
            totalAmount: 12.0,
            timestamp: new Date().toISOString(),
            paymentMethod: "cash",
        });
        const id = createRes.body.id;
        // Update status
        const updateRes = yield (0, supertest_1.default)(server_1.default).put(`/orders/${id}`).send({
            status: "completed",
        });
        expect(updateRes.status).toBe(200);
        expect(updateRes.body.status).toBe("completed");
    }));
    it("should return 404 for non-existing order", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).put("/orders/999999").send({
            status: "cancelled",
        });
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "Order not found");
    }));
});
