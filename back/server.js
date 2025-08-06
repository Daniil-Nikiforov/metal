import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

import pool from "./db/db.js";
import metalRoutes from "./routes/metalRoutes.js";
import metalSingleRoute from "./routes/metalSingleRoute.js";
import metalTypeRoutes from "./routes/metalTypeRoutes.js";
import allMetalsRoute from "./routes/allMetalsRoute.js";
import addCartItemsRoute from "./routes/addCartItemsRoute.js";
import getCartByIdRoute from "./routes/getCartByIdRoute.js";
import deleteFromCartRoute from "./routes/deleteFromCart.Route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet()); //защита
app.use(morgan("dev")); //log res

const __dirname = path.resolve();
const testAccount = await nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email", // специальный тестовый сервер
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

app.use("/api/metals", metalRoutes);
app.use("/api", metalTypeRoutes);
app.use("/api/metal", metalSingleRoute);
app.use("/api/get-all-metals", allMetalsRoute);
app.use("/api/cart", addCartItemsRoute);
app.use("/api/cart", getCartByIdRoute);
app.use("/api/cart/delete", deleteFromCartRoute);

setInterval(async () => {
  await pool.query(
    `DELETE FROM cart_items 
     WHERE added_at < NOW() - INTERVAL '1 days'`
  );
}, 86400000);

app.post("/api/send-textarea", async (req, res) => {
  try {
    const { textArea, customerEmail } = req.body;

    const htmlFromCustomer = `
    <table>
      <tr><td>Почта отправителя</td><td>Сообщение отправителя</td> </tr>
      <tr><td>${customerEmail}</td><td>${textArea}</td></tr>
    </table>`;

    const mailOptions = {
      from: customerEmail,
      to: "dnikiforovv994@gmail.com",
      subject: "Обращение клиента с вашего сайта",
      html: htmlFromCustomer,
    };

    const info = await transporter.sendMail(mailOptions);
    alert("Письмо успешно отправлено");
    console.log(nodemailer.getTestMessageUrl(info));
    res.status(200).json({ message: "Письмо успешно отправлено" });
  } catch (error) {
    console.log("Ошибка отправки", error);
    res.status(500).json({ error: "Ошибка при отправке письма" });
  }
});

app.listen(PORT, () => {
  console.log("server is running on 3000 port");
});
