import { Request, Response } from "express";
import { menuItems } from "../data/menu";
import { MenuItem } from "../models/menuItem";

export const getAllMenuItems = (req: Request, res: Response) => {
  let filteredItems = menuItems;

  const search = (req.query.search as string)?.toLowerCase();
  const category = (req.query.category as string)?.toLowerCase();
  const available = req.query.available;

  if (search) {
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(search)
    );
  }

  if (category) {
    filteredItems = filteredItems.filter(
      (item) => item.category.toLowerCase() === category
    );
  }

  if (available === "true" || available === "false") {
    const isAvailable = available === "true";
    filteredItems = filteredItems.filter(
      (item) => item.available === isAvailable
    );
  }

  res.json(filteredItems);
};

export const getMenuItemById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const item = menuItems.find((m) => m.id === id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Menu item not found" });
  }
};

export const createMenuItem = (req: Request, res: Response) => {
  const newItem: MenuItem = {
    id: Date.now(),
    ...req.body,
  };
  menuItems.push(newItem);
  res.status(201).json(newItem);
};

export const updateMenuItem = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const index = menuItems.findIndex((item) => item.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Item not found" });
    return;
  }

  menuItems[index] = { ...menuItems[index], ...req.body };
  res.json(menuItems[index]);
};

export const deleteMenuItem = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const index = menuItems.findIndex((item) => item.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Item not found" });
    return;
  }

  const deleted = menuItems.splice(index, 1);
  res.json(deleted[0]);
};
