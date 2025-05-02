import request from "supertest";
import app from "../server";
import { menuItems, initialMenuItems } from "../data/menu";

beforeEach(() => {
  menuItems.length = 0;
  menuItems.push(...initialMenuItems);
});

describe("GET /menu", () => {
  it("should return an array of menu items", async () => {
    const response = await request(app).get("/menu");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("name");
  });
});

describe("POST /menu", () => {
  it("should create a new menu item", async () => {
    const newItem = {
      name: "Test Pasta",
      price: 9.99,
      category: "Pasta",
      available: true,
    };

    const response = await request(app).post("/menu").send(newItem);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Test Pasta");
  });

  it("should fail with invalid data", async () => {
    const response = await request(app).post("/menu").send({ name: "" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Validation error");
  });
});

describe("PUT /menu/:id", () => {
  it("should update an existing menu item", async () => {
    // Create a new menu item to update
    const createRes = await request(app).post("/menu").send({
      name: "Garlic Bread",
      price: 4.5,
      category: "Appetizer",
      available: true,
    });

    const id = createRes.body.id;

    // Now update it
    const updateRes = await request(app).put(`/menu/${id}`).send({
      price: 5.0,
      available: false,
    });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.price).toBe(5.0);
    expect(updateRes.body.available).toBe(false);
  });

  it("should return 404 when updating non-existent menu item", async () => {
    const res = await request(app).put("/menu/999999").send({
      price: 10.0,
    });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Item not found");
  });
});

describe("DELETE /menu/:id", () => {
  it("should delete an existing menu item", async () => {
    // Create a new item to delete
    const createRes = await request(app).post("/menu").send({
      name: "Focaccia",
      price: 6.0,
      category: "Appetizer",
      available: true,
    });

    const id = createRes.body.id;

    // Now delete it
    const deleteRes = await request(app).delete(`/menu/${id}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.name).toBe("Focaccia");

    // Verify it no longer exists
    const getRes = await request(app).get(`/menu/${id}`);
    expect(getRes.status).toBe(404);
  });

  it("should return 404 when deleting a non-existent item", async () => {
    const res = await request(app).delete("/menu/999999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Item not found");
  });
});
