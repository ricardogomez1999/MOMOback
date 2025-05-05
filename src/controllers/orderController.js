"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.getOrders = exports.createOrder = void 0;
const orders_1 = require("../data/orders");
const createOrder = (req, res) => {
    const newOrder = Object.assign({ id: Date.now() }, req.body);
    orders_1.orders.push(newOrder);
    res.status(201).json(newOrder);
};
exports.createOrder = createOrder;
const getOrders = (req, res) => {
    const { day, month, year, page = "1", limit = "10" } = req.query;
    let filtered = orders_1.orders;
    if (day) {
        const target = new Date(day).toISOString().slice(0, 10);
        filtered = filtered.filter((o) => o.timestamp.slice(0, 10) === target);
    }
    else if (month) {
        const target = month.slice(0, 7);
        filtered = filtered.filter((o) => o.timestamp.startsWith(target));
    }
    else if (year) {
        const target = year;
        filtered = filtered.filter((o) => o.timestamp.startsWith(target));
    }
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const startIndex = (pageNumber - 1) * limitNumber;
    const paginated = filtered.slice(startIndex, startIndex + limitNumber);
    res.json({
        data: paginated,
        meta: {
            total: filtered.length,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(filtered.length / limitNumber),
        },
    });
};
exports.getOrders = getOrders;
const updateOrder = (req, res) => {
    const id = parseInt(req.params.id);
    const index = orders_1.orders.findIndex((o) => o.id === id);
    if (index === -1) {
        res.status(404).json({ message: "Order not found" });
        return;
    }
    orders_1.orders[index] = Object.assign(Object.assign({}, orders_1.orders[index]), req.body);
    res.json(orders_1.orders[index]);
};
exports.updateOrder = updateOrder;
