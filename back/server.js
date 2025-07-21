import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";

import metalRoutes from "./routes/metalRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet()); //защита
app.use(morgan("dev")); //log res

const __dirname = path.resolve();

app.use("/api/metals", metalRoutes);

app.listen(PORT, () => {
  console.log("server is running on 3000 port");
});
