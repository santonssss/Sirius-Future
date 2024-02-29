const express = require("express");
const fs = require("fs").promises;
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const filePath = "totalAmount.json";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  res.header("Access-Control-Allow-Credentials", true);

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.get("/getTotalAmount", async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/updateTotalAmount", async (req, res) => {
  try {
    const { amount } = req.body;

    if (isNaN(amount)) {
      return res.status(400).json({ error: "Неверная сумма" });
    }

    const data = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);

    jsonData.allTime = (
      parseFloat(jsonData.allTime) + parseFloat(amount)
    ).toFixed(2);

    const currentDate = new Date();
    const month = currentDate.toLocaleString("ru-RU", { month: "long" });

    jsonData.monthly[month] = (
      parseFloat(jsonData.monthly[month]) + parseFloat(amount)
    ).toFixed(2);
    const dayOfMonth = currentDate.getDate();
    if (jsonData.day.hasOwnProperty(dayOfMonth)) {
      jsonData.day[dayOfMonth] = (
        parseFloat(jsonData.day[dayOfMonth]) + parseFloat(amount)
      ).toFixed(2);
    } else {
      jsonData.day[dayOfMonth] = parseFloat(amount).toFixed(2);
    }
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
    res.json({ success: true, newData: jsonData });
  } catch (error) {
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});
app.post("/updateTotalAmountNapitki", async (req, res) => {
  try {
    const { amount, drinks } = req.body;

    if (isNaN(amount)) {
      return errorHandler(res, 400, "Неверная сумма");
    }

    const currentDate = new Date();
    const month = currentDate.toLocaleString("ru-RU", { month: "long" });
    const dayOfMonth = currentDate.getDate();

    const data = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);

    // Обновление общей суммы продаж напитков
    const totalDrinksAmount = drinks.reduce(
      (total, drink) => total + drink.price * drink.quantity,
      0
    );
    jsonData.napitki = (
      parseFloat(jsonData.napitki) + totalDrinksAmount
    ).toFixed(2);

    // Обновление данных по месяцам
    if (!jsonData.monthlyNapitki[month]) {
      jsonData.monthlyNapitki[month] = {};
    }

    drinks.forEach((drink) => {
      if (!jsonData.monthlyNapitki[month][drink.name]) {
        jsonData.monthlyNapitki[month][drink.name] = "0";
      }
      jsonData.monthlyNapitki[month][drink.name] = (
        parseFloat(jsonData.monthlyNapitki[month][drink.name]) +
        parseFloat(drink.quantity)
      ).toFixed(2);
    });
    if (!jsonData.dayNapitki[dayOfMonth]) {
      jsonData.dayNapitki[dayOfMonth] = {};
    }

    drinks.forEach((drink) => {
      if (!jsonData.dayNapitki[dayOfMonth][drink.name]) {
        jsonData.dayNapitki[dayOfMonth][drink.name] = "0";
      }
      jsonData.dayNapitki[dayOfMonth][drink.name] = (
        parseFloat(jsonData.dayNapitki[dayOfMonth][drink.name]) +
        parseFloat(drink.quantity)
      ).toFixed(2);
    });

    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
    res.json({ success: true, newData: jsonData });
  } catch (error) {
    errorHandler(res, 500, "Внутренняя ошибка сервера");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
