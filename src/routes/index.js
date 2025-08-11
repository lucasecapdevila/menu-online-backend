import express from "express";
import menuRoutes from "./menuRoutes.js";

const router = express.Router();

// Rutas del menú
router.use("/menu", menuRoutes);

// Ruta de salud del servidor
router.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

export default router;
