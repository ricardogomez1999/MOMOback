"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItems = exports.initialMenuItems = void 0;
exports.initialMenuItems = [
    {
        id: 1,
        name: "Margherita Pizza",
        price: 12.99,
        category: "Pizza",
        available: true,
    },
    {
        id: 2,
        name: "Caesar Salad",
        price: 9.5,
        category: "Salad",
        available: true,
    },
    {
        id: 3,
        name: "Spaghetti Carbonara",
        price: 13.75,
        category: "Pasta",
        available: false,
    },
    { id: 4, name: "Tiramisu", price: 7.5, category: "Dessert", available: true },
];
exports.menuItems = [...exports.initialMenuItems];
