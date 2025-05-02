import { Request, Response } from "express";
import { orders } from "../data/orders";
import { Order } from "../models/order";

export const createOrder = (req: Request, res: Response): void => {
  const newOrder: Order = {
    id: Date.now(),
    ...req.body,
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
};

export const getOrders = (req: Request, res: Response): void => {
  const { day, month, year, page = "1", limit = "10" } = req.query;

  let filtered = orders;

  if (day) {
    const target = new Date(day as string).toISOString().slice(0, 10);
    filtered = filtered.filter((o) => o.timestamp.slice(0, 10) === target);
  } else if (month) {
    const target = (month as string).slice(0, 7);
    filtered = filtered.filter((o) => o.timestamp.startsWith(target));
  } else if (year) {
    const target = year as string;
    filtered = filtered.filter((o) => o.timestamp.startsWith(target));
  }

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
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

export const updateOrder = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const index = orders.findIndex((o) => o.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  orders[index] = { ...orders[index], ...req.body };
  res.json(orders[index]);
};
