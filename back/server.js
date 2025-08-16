import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import compression from "compression";
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
app.use(cors({
    origin: 'http://185.23.35.28', // Укажите адрес фронта
  methods: ['GET', 'POST','DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
app.use(helmet()); //защита
app.use(morgan("dev")); //log res
app.use(compression()); //gzip-сжатие
app.use(express.static("public", { maxAge: "1d" })); //кэширование статики

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

app.post("/api/send-cart", async (req, res) => {
  try {
    const { cart, fio, email, phone, delivery, comment, cart_id } = req.body;
    const customerData = {
      fio: fio,
      email: email,
      phone: phone,
      delivery: delivery,
      comment: comment,
    };
    await pool.query(
      `DELETE FROM cart_items 
     WHERE cart_id = $1 RETURNING *`,
      [cart_id]
    );
    const generateCartEmail = (cart, customerData) => {
      return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Open Sans', sans-serif;
            line-height: 1.6;
            color: #000;
            background-color: #f5f5f5;
            padding: 20px;
            margin: 0;
        }
        .email-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
        }
        .email-header {
            background: #ab372e;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .email-body {
            padding: 20px;
        }
        .customer-info {
            margin-bottom: 30px;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
        }
        .info-row {
            display: flex;
            margin-bottom: 10px;
        }
        .info-label {
            font-weight: 600;
            color: #000;
            min-width: 150px;
        }
        .info-value {
            color: #000;
            flex: 1;
        }
        .basket-items {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .basket-item {
            display: flex;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            padding: 15px;
            position: relative;
        }
        .item-details {
            flex: 1;
        }
        .item-name {
            margin: 0 0 10px 0;
            color: #000;
            font-size: 18px;
        }
        .item-specs {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .spec-row {
            display: flex;
            gap: 10px;
        }
        .spec-name {
            font-weight: 600;
            color: #000;
        }
        .spec-value {
            color: #000;
        }
        .item-quantity {
            display: flex;
            align-items: center;
            min-width: 120px;
            justify-content: center;
            border-left: 1px dashed #e0e0e0;
            padding-left: 15px;
        }
        .quantity-controls {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
        }
        .quantity-value {
            font-weight: bold;
            font-size: 18px;
        }
        .total-section {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
            text-align: right;
            font-size: 18px;
        }
        .total-amount {
            font-weight: bold;
            color: #ab372e;
            font-size: 20px;
        }
        .comment-section {
            margin-top: 20px;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
        }
        .comment-label {
            font-weight: 600;
            color: #000;
            margin-bottom: 8px;
        }
        .comment-text {
            color: #000;
            line-height: 1.5;
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h2>Новый заказ</h2>
        </div>
        <div class="email-body">
            <div class="customer-info">
                <h3 style="margin-top: 0; margin-bottom: 15px;">Данные заказчика</h3>
                <div class="info-row">
                    <span class="info-label">ФИО:</span>
                    <span class="info-value">${
                      customerData.fio || "Не указано"
                    }</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value">${
                      customerData.email || "Не указано"
                    }</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Телефон:</span>
                    <span class="info-value">${
                      customerData.phone || "Не указано"
                    }</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Адрес доставки:</span>
                    <span class="info-value">${
                      customerData.delivery || "Не указано"
                    }</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Комментарий к заказу:</span>
                    <span class="info-value">${
                      customerData.comment || "Не указано"
                    }</span>
                </div>
            </div>

            <h3 style="margin-bottom: 15px;">Состав заказа</h3>
            <div class="basket-items">
                ${cart
                  .map(
                    (item, index) => `
                <div class="basket-item">
                    <div class="item-details">
                        <h3 class="item-name">${
                          item?.row_data[0] || "Без названия"
                        }</h3>
                        <div class="item-specs">
                            ${item?.headers
                              .slice(1)
                              .map((header, i) => {
                                if (
                                  header
                                    .toLowerCase()
                                    .trim()
                                    .includes("цена") ||
                                  header.toLowerCase() ===
                                    "цена за тонну (руб)" ||
                                  header.toLowerCase() === "цена за 1 тонну" ||
                                  header.toLowerCase() === "цена за тонну руб."
                                )
                                  return "";

                                const value = item?.row_data[i + 1];

                                if (header.includes("Вес")) {
                                  return `
                                <div class="spec-row">
                                    <span class="spec-name">${header}:</span>
                                    <span class="spec-value">${value} кг</span>
                                </div>`;
                                }

                                return `
                              <div class="spec-row">
                                  <span class="spec-name">${header}:</span>
                                  <span class="spec-value">${value}</span>
                              </div>`;
                              })
                              .join("")}
                        </div>
                    </div>
                    <div class="item-quantity">
                        <div class="quantity-controls">
                            Кол-во:
                            <span class="quantity-value">${item.quantity}</span>
                        </div>
                    </div>
                </div>
                `
                  )
                  .join("")}
            </div>
        </div>
    </div>
</body>
</html>`;
    };

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Заказ клиента с вашего сайта",
      html: generateCartEmail(cart, customerData),
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: "Письмо успешно отправлено" });
  } catch (error) {}
});

app.post("/api/send-phone", async (req, res) => {
  try {
    const { phone } = req.body;
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
            background: #ab372e;
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
            table-layout: fixed;
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
            word-wrap: break-word;
            overflow-wrap: break-word;
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
            word-break: break-word;
            height:100%;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h2>Запрос на звонок</h2>
        </div>
        <div class="email-body">
            <table>
                <tr>
                    <th>Телефон отправителя</th>
                </tr>
                <tr>
                    <td class="customer-email">${phone}</td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Запрос на звонок с вашего сайта",
      html: htmlFromCustomer,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Письмо успешно отправлено" });
  } catch (error) {
    console.log("Ошибка отправки", error);
    res.status(500).json({ error: "Ошибка при отправке письма" });
  }
});

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
            background: #ab372e;
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
            table-layout: fixed;
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
            word-wrap: break-word;
            overflow-wrap: break-word;
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
            word-break: break-word;
            height:100%;
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
