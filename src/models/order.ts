export interface OrderItem {
  menuItemId: number;
  quantity: number;
}

export type PaymentMethod = "cash" | "card" | "transfer" | "mobile";

export interface Order {
  id: number;
  items: OrderItem[];
  totalAmount: number;
  timestamp: string; // ISO string
  tableNumber?: number;
  customerName?: string;
  status?: "pending" | "completed" | "cancelled";
  paymentMethod: PaymentMethod;
}
