const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;
const dataFilePath = "fruits.json";

app.use(bodyParser.json());

let fruits = [];

try {
  const data = fs.readFileSync(dataFilePath, "utf8");
  fruits = JSON.parse(data).fruits || [];
} catch (error) {
  console.error("Ошибка при загрузке данных из файла:", error.message);
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/fruits", (req, res) => {
  res.json({ fruits });
});
app.post("/fruits", (req, res) => {
  const newFruit = req.body.fruit;

  fruits.push(newFruit);

  fs.writeFileSync(dataFilePath, JSON.stringify({ fruits }), "utf8");

  res.json({ message: "Фрукт успешно добавлен", fruits: fruits });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
