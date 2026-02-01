import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Cargar config
dotenv.config();

// Crea un servidor
const app = express();
const PORT = process.env.PORT ?? 3000;

// Middlewares
app.use(cors()); // Permite peticiones desde otros orígenes
app.use(express.json()); // Permite leer JSON desde el body

// Define rutas

const mockHabits = [
  {
    id: "1",
    name: "Leer",
    days: {
      mon: true,
      tue: true,
      wed: false,
      thu: true,
      fri: true,
      sat: true,
      sun: true,
    },
  },
  {
    id: "2",
    name: "Gym",
    days: {
      mon: true,
      tue: true,
      wed: false,
      thu: true,
      fri: true,
      sat: false,
      sun: true,
    },
  },
];

app.get("/habits", (_req, res) => {
  res.json(mockHabits);
});

// Escucha en un puerto
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
