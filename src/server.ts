import express from "express";
import cors from "cors";
import menuRoutes from "./routes/menu";
import ingredientRoutes from "./routes/ingredients";
import orderRoutes from "./routes/orders";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/menu", menuRoutes);
app.use("/ingredients", ingredientRoutes);
app.use("/orders", orderRoutes);

app.get("/", (_, res) => {
  res.send("Restaurant Mock API (TypeScript) is running!");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () =>
    console.log("Server running on http://localhost:3000")
  );
}

export default app;
