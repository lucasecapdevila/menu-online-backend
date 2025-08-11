import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware global
app.use(cors());
app.use(express.json());

// Rutas
app.use("/", routes);

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

export default app;
