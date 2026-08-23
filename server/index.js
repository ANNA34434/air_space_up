const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/search-tickets", async (req, res) => {
  try {
    const { origin, destination, depart_date } = req.query;

    const token = process.env.VITE_TRAVELPAYOUTS_TOKEN;

    if (!token) {
      return res.status(500).json({ error: "Токен не найден в .env" });
    }

    const url = `https://api.travelpayouts.com/v1/prices/cheap?origin=${origin}&destination=${destination}&depart_date=${depart_date || ""}&token=${token}`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Ошибка сервера:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
