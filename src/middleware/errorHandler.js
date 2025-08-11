import { HTTP_STATUS } from "../utils/constants.js";

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Error personalizado con mensaje específico
  if (err.message === "No hay datos" || err.message === "ID no encontrado") {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      error: err.message,
    });
  }

  // Error de Google Sheets API
  if (err.code && err.errors) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: "Error en la API de Google Sheets",
      details: err.message,
    });
  }

  // Error genérico del servidor
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: "Error interno del servidor",
  });
};

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
