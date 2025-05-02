import request from "supertest";
import app from "../server";
import { orders, initialOrders } from "../data/orders";

beforeEach(() => {
  orders.length = 0;
  orders.push(...initialOrders);
});
describe("POST /orders", () => {
  it("should create a valid order", async () => {
    const newOrder = {
      items: [
        { menuItemId: 1, quantity: 2 },
        { menuItemId: 2, quantity: 1 },
      ],
      totalAmount: 27.5,
      timestamp: new Date().toISOString(),
      paymentMethod: "card",
    };

    const res = await request(app).post("/orders").send(newOrder);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.items.length).toBe(2);
  });

  it("should reject an invalid order", async () => {
    const badOrder = {
      items: [],
      totalAmount: -5,
      timestamp: "not-a-date",
      paymentMethod: "cheque",
    };

    const res = await request(app).post("/orders").send(badOrder);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation error");
    expect(res.body.errors).toHaveProperty("items");
    expect(res.body.errors).toHaveProperty("totalAmount");
    expect(res.body.errors).toHaveProperty("timestamp");
    expect(res.body.errors).toHaveProperty("paymentMethod");
  });
});

describe("GET /orders with filters", () => {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const year = new Date().getFullYear();
  const month = today.slice(0, 7);

  it("should return orders by day", async () => {
    const res = await request(app).get(`/orders?day=${today}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return orders by month", async () => {
    const res = await request(app).get(`/orders?month=${month}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return orders by year", async () => {
    const res = await request(app).get(`/orders?year=${year}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("PUT /orders/:id", () => {
  it("should update an existing order status", async () => {
    // Create a new order to update
    const createRes = await request(app)
      .post("/orders")
      .send({
        items: [{ menuItemId: 1, quantity: 1 }],
        totalAmount: 12.0,
        timestamp: new Date().toISOString(),
        paymentMethod: "cash",
      });

    const id = createRes.body.id;

    // Update status
    const updateRes = await request(app).put(`/orders/${id}`).send({
      status: "completed",
    });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.status).toBe("completed");
  });

  it("should return 404 for non-existing order", async () => {
    const res = await request(app).put("/orders/999999").send({
      status: "cancelled",
    });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Order not found");
  });
});
