import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";

import pool from "./db/db.js";
import metalRoutes from "./routes/metalRoutes.js";
import metalSingleRoute from "./routes/metalSingleRoute.js";
import metalTypeRoutes from "./routes/metalTypeRoutes.js";
import allMetalsRoute from "./routes/allMetalsRoute.js";
import addCartItemsRoute from "./routes/addCartItemsRoute.js";
import getCartByIdRoute from "./routes/getCartByIdRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet()); //защита
app.use(morgan("dev")); //log res

const __dirname = path.resolve();

app.use("/api/metals", metalRoutes);
app.use("/api", metalTypeRoutes);
app.use("/api/metal", metalSingleRoute);
app.use("/api/get-all-metals", allMetalsRoute);
app.use("/api/cart", addCartItemsRoute);
app.use("/api/cart", getCartByIdRoute);

setInterval(async () => {
  await pool.query(
    `DELETE FROM cart_items 
     WHERE added_at < NOW() - INTERVAL '1 days'`
  );
}, 86400000);

app.listen(PORT, () => {
  console.log("server is running on 3000 port");
});
