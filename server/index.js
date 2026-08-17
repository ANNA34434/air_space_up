const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); // Для чтения ключа из .env
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Разрешаем отправку данных из React-приложения
app.use(cors());
app.use(express.json());

// Маршрут для обработки поиска рейсов
app.post("/api/search-tickets", async (req, res) => {
  try {
    const payload = req.body; // Данные, пришедшие из SearchForm.jsx

    const response = await fetch("https://api.duffel.com/air/offer_requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Duffel-Version": "v2",
        Authorization: `Bearer ${process.env.VITE_DUFFEL_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    // Возвращаем найденные билеты обратно в React
    res.json(data);
  } catch (error) {
    console.error("Ошибка сервера:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.listen(PORT, () => {
  console.log(`Прокси-сервер запущен на http://localhost:${PORT}`);
});
