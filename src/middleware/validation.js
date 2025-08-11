import { HTTP_STATUS } from "../utils/constants.js";

export const validateMenuItemCreate = (req, res, next) => {
  const { categoria, producto, precio } = req.body;

  const errors = [];

  if (!categoria || categoria.trim() === "") {
    errors.push("Categoría es requerida");
  }

  if (!producto || producto.trim() === "") {
    errors.push("Producto es requerido");
  }

  if (!precio || precio.toString().trim() === "") {
    errors.push("Precio es requerido");
  } else if (isNaN(parseFloat(precio))) {
    errors.push("Precio debe ser un número válido");
  }

  if (errors.length > 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: "Datos de entrada inválidos",
      details: errors,
    });
  }

  next();
};

export const validateMenuItemUpdate = (req, res, next) => {
  const { categoria, producto, precio } = req.body;
  const errors = [];

  // Para actualización, los campos son opcionales pero si se proporcionan deben ser válidos
  if (categoria !== undefined && categoria.trim() === "") {
    errors.push("Categoría no puede estar vacía");
  }

  if (producto !== undefined && producto.trim() === "") {
    errors.push("Producto no puede estar vacío");
  }

  if (precio !== undefined) {
    if (precio.toString().trim() === "") {
      errors.push("Precio no puede estar vacío");
    } else if (isNaN(parseFloat(precio))) {
      errors.push("Precio debe ser un número válido");
    }
  }

  if (errors.length > 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: "Datos de entrada inválidos",
      details: errors,
    });
  }

  next();
};

export const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id || id.trim() === "") {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: "ID es requerido",
    });
  }

  next();
};
