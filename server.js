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
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString("ru-RU", { month: "long" });
    const dayOfMonth = currentDate.getDate();

    // Уникальная идентификация для каждой даты
    if (!jsonData.day[year]) {
      jsonData.day[year] = {};
    }
    if (!jsonData.day[year][month]) {
      jsonData.day[year][month] = {};
    }

    if (jsonData.day[year][month].hasOwnProperty(dayOfMonth)) {
      jsonData.day[year][month][dayOfMonth] = (
        parseFloat(jsonData.day[year][month][dayOfMonth]) + parseFloat(amount)
      ).toFixed(2);
    } else {
      jsonData.day[year][month][dayOfMonth] = parseFloat(amount).toFixed(2);
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
      return res.status(400).json({ error: "Неверная сумма" });
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
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

    // Уникальная идентификация для каждой даты в разделе с напитками
    if (!jsonData.dayNapitki[year]) {
      jsonData.dayNapitki[year] = {};
    }
    if (!jsonData.dayNapitki[year][month]) {
      jsonData.dayNapitki[year][month] = {};
    }

    drinks.forEach((drink) => {
      // Обновление данных по месяцам для напитков
      if (!jsonData.monthlyNapitki[year]) {
        jsonData.monthlyNapitki[year] = {};
      }
      if (!jsonData.monthlyNapitki[year][month]) {
        jsonData.monthlyNapitki[year][month] = {};
      }

      if (!jsonData.monthlyNapitki[year][month][drink.name]) {
        jsonData.monthlyNapitki[year][month][drink.name] = "0";
      }

      jsonData.monthlyNapitki[year][month][drink.name] = (
        parseFloat(jsonData.monthlyNapitki[year][month][drink.name]) +
        parseFloat(drink.quantity)
      ).toFixed(2);

      // Обновление данных по дням для напитков
      if (jsonData.dayNapitki[year][month].hasOwnProperty(dayOfMonth)) {
        if (!jsonData.dayNapitki[year][month][dayOfMonth][drink.name]) {
          jsonData.dayNapitki[year][month][dayOfMonth][drink.name] = "0";
        }
        jsonData.dayNapitki[year][month][dayOfMonth][drink.name] = (
          parseFloat(jsonData.dayNapitki[year][month][dayOfMonth][drink.name]) +
          parseFloat(drink.quantity)
        ).toFixed(2);
      } else {
        jsonData.dayNapitki[year][month][dayOfMonth] = {};
        jsonData.dayNapitki[year][month][dayOfMonth][drink.name] = parseFloat(
          drink.quantity
        ).toFixed(2);
      }
    });

    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
    res.json({ success: true, newData: jsonData });
  } catch (error) {
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
