"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const menu_1 = __importDefault(require("./routes/menu"));
const ingredients_1 = __importDefault(require("./routes/ingredients"));
const orders_1 = __importDefault(require("./routes/orders"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/menu", menu_1.default);
app.use("/ingredients", ingredients_1.default);
app.use("/orders", orders_1.default);
app.get("/", (_, res) => {
    res.send("Restaurant Mock API (TypeScript) is running!");
});
if (process.env.NODE_ENV !== "test") {
    app.listen(3000, () => console.log("Server running on http://localhost:3000"));
}
exports.default = app;
