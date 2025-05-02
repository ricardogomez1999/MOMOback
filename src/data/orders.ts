import { Order } from "../models/order";

export const initialOrders: Order[] = [
  {
    id: 1,
    items: [
      { menuItemId: 1, quantity: 2 },
      { menuItemId: 3, quantity: 1 },
    ],
    totalAmount: 32.5,
    timestamp: "2025-04-25T13:15:00Z",
    tableNumber: 4,
    customerName: "Alice",
    status: "completed",
    paymentMethod: "card",
  },
  {
    id: 2,
    items: [{ menuItemId: 2, quantity: 1 }],
    totalAmount: 9.5,
    timestamp: "2025-04-27T18:45:00Z",
    tableNumber: 2,
    customerName: "Bob",
    status: "pending",
    paymentMethod: "cash",
  },
  {
    id: 3,
    items: [
      { menuItemId: 1, quantity: 1 },
      { menuItemId: 4, quantity: 2 },
    ],
    totalAmount: 28.0,
    timestamp: "2025-04-28T12:00:00Z",
    customerName: "Clara",
    status: "completed",
    paymentMethod: "mobile",
  },
];

export let orders: Order[] = [...initialOrders];
