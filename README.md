# 🍽️ MOMO Mock API

A mock REST API for managing a restaurant's menu, ingredients, and orders — built with **Express**, **TypeScript**, and **Zod**. Ideal for prototyping or presenting to partners (like Wansoft) before integrating with real APIs or databases.

---

## 🚀 Features

- ✅ CRUD for Menu Items and Ingredients
- ✅ Create and manage Orders
- ✅ Date-based Order Filtering (by day, month, year)
- ✅ Pagination on Orders
- ✅ Zod-powered input validation
- ✅ Organized with Controllers, Routes, and Middleware
- ✅ Fully tested with Jest + Supertest

---

## 🗂️ API Endpoints

### 🔹 Menu

| Method | Route       | Description                           |
| ------ | ----------- | ------------------------------------- |
| GET    | `/menu`     | Get all menu items (supports filters) |
| GET    | `/menu/:id` | Get single menu item                  |
| POST   | `/menu`     | Create menu item                      |
| PUT    | `/menu/:id` | Update menu item                      |
| DELETE | `/menu/:id` | Delete menu item                      |

#### Filters:

- `?search=...` — search by name
- `?category=...`
- `?available=true/false`

---

### 🔹 Ingredients

| Method | Route              | Description           |
| ------ | ------------------ | --------------------- |
| GET    | `/ingredients`     | Get all ingredients   |
| GET    | `/ingredients/:id` | Get single ingredient |
| POST   | `/ingredients`     | Add new ingredient    |
| PUT    | `/ingredients/:id` | Update ingredient     |
| DELETE | `/ingredients/:id` | Delete ingredient     |

---

### 🔹 Orders

| Method | Route         | Description                                    |
| ------ | ------------- | ---------------------------------------------- |
| GET    | `/orders`     | Get all orders (filter + pagination supported) |
| POST   | `/orders`     | Create a new order                             |
| PUT    | `/orders/:id` | Update an order (e.g. status)                  |

#### Filters:

- `?day=YYYY-MM-DD`
- `?month=YYYY-MM`
- `?year=YYYY`

#### Pagination:

- `?page=1&limit=10`

---

## 🧪 Running Tests

```bash
npm test
```
