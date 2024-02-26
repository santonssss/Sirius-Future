const express = require("express");
const fs = require("fs").promises;

const app = express();
const PORT = 3001;

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
    const { amount, tableNumber } = req.body;

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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
