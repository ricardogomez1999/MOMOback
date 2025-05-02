import request from "supertest";
import app from "../server";
import { ingredients, initialIngredients } from "../data/ingredients";

beforeEach(() => {
  ingredients.length = 0;
  ingredients.push(...initialIngredients);
});

describe("GET /ingredients", () => {
  it("should return an array of ingredients", async () => {
    const res = await request(app).get("/ingredients");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("name");
  });
});

describe("POST /ingredients", () => {
  it("should create a new ingredient with valid data", async () => {
    const newIngredient = {
      name: "Parmesan Cheese",
      stock_quantity: 5,
      unit: "kg",
    };

    const res = await request(app).post("/ingredients").send(newIngredient);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Parmesan Cheese");
  });

  it("should return 400 for invalid ingredient data", async () => {
    const badIngredient = {
      name: "",
      stock_quantity: -10,
      unit: "",
    };

    const res = await request(app).post("/ingredients").send(badIngredient);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Validation error");
    expect(res.body.errors).toHaveProperty("name");
    expect(res.body.errors).toHaveProperty("stock_quantity");
  });
});

describe("PUT /ingredients/:id", () => {
  it("should update an existing ingredient", async () => {
    // First, create a new ingredient to update
    const createRes = await request(app).post("/ingredients").send({
      name: "Mozzarella",
      stock_quantity: 10,
      unit: "kg",
    });

    const id = createRes.body.id;

    // Now update it
    const updateRes = await request(app).put(`/ingredients/${id}`).send({
      stock_quantity: 25,
    });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.stock_quantity).toBe(25);
  });

  it("should return 404 for non-existing ingredient", async () => {
    const res = await request(app).put("/ingredients/999999").send({
      stock_quantity: 5,
    });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Ingredient not found");
  });
});

describe("DELETE /ingredients/:id", () => {
  it("should delete an existing ingredient", async () => {
    // First, create a new ingredient to delete
    const createRes = await request(app).post("/ingredients").send({
      name: "Basil",
      stock_quantity: 1,
      unit: "bunch",
    });

    const id = createRes.body.id;

    // Now delete it
    const deleteRes = await request(app).delete(`/ingredients/${id}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.name).toBe("Basil");

    // Ensure it's really gone
    const getRes = await request(app).get(`/ingredients/${id}`);
    expect(getRes.status).toBe(404);
  });

  it("should return 404 for deleting non-existing ingredient", async () => {
    const res = await request(app).delete("/ingredients/999999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Ingredient not found");
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
