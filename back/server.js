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
import searchRoute from "./routes/searchRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet()); //защита
app.use(morgan("dev")); //log res

const __dirname = path.resolve();

const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.error("Ошибка подключения к SMTP:", error);
  } else {
    console.log("SMTP сервер готов к отправке писем");
  }
});

app.use("/api/metals", metalRoutes);
app.use("/api", metalTypeRoutes);
app.use("/api/metal", metalSingleRoute);
app.use("/api/get-all-metals", allMetalsRoute);
app.use("/api/cart", addCartItemsRoute);
app.use("/api/cart", getCartByIdRoute);
app.use("/api/cart/delete", deleteFromCartRoute);
app.use("/api/metals/search", searchRoute);

setInterval(async () => {
  await pool.query(
    `DELETE FROM cart_items 
     WHERE added_at < NOW() - INTERVAL '1 days'`
  );
}, 86400000);

app.post("/api/send-textarea", async (req, res) => {
  try {
    const { textArea, customerEmail } = req.body;

    // const htmlFromCustomer = `
    // <table>
    //   <tr><td>Почта отправителя</td><td>Сообщение отправителя</td> </tr>
    //   <tr><td>${customerEmail}</td><td>${textArea}</td></tr>
    // </table>`;
    const htmlFromCustomer = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Open Sans, sans-serif;
            line-height: 1.6;
            color: #000;
            background-color: #fff;
            padding: 10px;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 5px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .email-header {
            background: #82071b;
            color: white;
            padding: 10px;
            text-align: center;
        }
        .email-body {
            padding: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
        }
        th {
            background-color: #fff;
            color: #000;
            text-align: left;
            padding: 12px 15px;
            font-weight: 600;
        }
        td {
            padding: 12px 15px;
            border-bottom: 1px solid #e0e0e0;
            vertical-align: top;
        }
        tr:hover td {
            background-color: #f9fafc;
        }
        .customer-email {
            color: #000;
            font-weight: 500;
        }
        .customer-message {
            line-height: 1.5;
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h2>Новое сообщение от клиента</h2>
        </div>
        <div class="email-body">
            <table>
                <tr>
                    <th>Почта отправителя</th>
                    <th>Сообщение</th>
                </tr>
                <tr>
                    <td class="customer-email">${customerEmail}</td>
                    <td class="customer-message">${textArea}</td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Обращение клиента с вашего сайта",
      html: htmlFromCustomer,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Письмо успешно отправлено" });
  } catch (error) {
    console.log("Ошибка отправки", error);
    res.status(500).json({ error: "Ошибка при отправке письма" });
  }
});

app.listen(PORT, () => {
  console.log("server is running on 3000 port");
});
