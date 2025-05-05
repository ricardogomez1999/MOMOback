"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItem = exports.updateMenuItem = exports.createMenuItem = exports.getMenuItemById = exports.getAllMenuItems = void 0;
const menu_1 = require("../data/menu");
const getAllMenuItems = (req, res) => {
    var _a, _b;
    let filteredItems = menu_1.menuItems;
    const search = (_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    const category = (_b = req.query.category) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    const available = req.query.available;
    if (search) {
        filteredItems = filteredItems.filter((item) => item.name.toLowerCase().includes(search));
    }
    if (category) {
        filteredItems = filteredItems.filter((item) => item.category.toLowerCase() === category);
    }
    if (available === "true" || available === "false") {
        const isAvailable = available === "true";
        filteredItems = filteredItems.filter((item) => item.available === isAvailable);
    }
    res.json(filteredItems);
};
exports.getAllMenuItems = getAllMenuItems;
const getMenuItemById = (req, res) => {
    const id = parseInt(req.params.id);
    const item = menu_1.menuItems.find((m) => m.id === id);
    if (item) {
        res.json(item);
    }
    else {
        res.status(404).json({ message: "Menu item not found" });
    }
};
exports.getMenuItemById = getMenuItemById;
const createMenuItem = (req, res) => {
    const newItem = Object.assign({ id: Date.now() }, req.body);
    menu_1.menuItems.push(newItem);
    res.status(201).json(newItem);
};
exports.createMenuItem = createMenuItem;
const updateMenuItem = (req, res) => {
    const id = parseInt(req.params.id);
    const index = menu_1.menuItems.findIndex((item) => item.id === id);
    if (index === -1) {
        res.status(404).json({ message: "Item not found" });
        return;
    }
    menu_1.menuItems[index] = Object.assign(Object.assign({}, menu_1.menuItems[index]), req.body);
    res.json(menu_1.menuItems[index]);
};
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = (req, res) => {
    const id = parseInt(req.params.id);
    const index = menu_1.menuItems.findIndex((item) => item.id === id);
    if (index === -1) {
        res.status(404).json({ message: "Item not found" });
        return;
    }
    const deleted = menu_1.menuItems.splice(index, 1);
    res.json(deleted[0]);
};
exports.deleteMenuItem = deleteMenuItem;
