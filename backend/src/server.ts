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
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Escucha en un puerto
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
