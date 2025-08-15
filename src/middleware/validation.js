import { HTTP_STATUS } from "../utils/constants.js";

export const validateMenuItemCreate = (req, res, next) => {
  const { categoria, subcategoria, producto, precio, descripcion, stock, img } =
    req.body;

  const errors = [];

  if (!categoria || categoria.trim() === "") {
    errors.push("Categoría es requerida");
  }

  // Subcategoría es opcional pero si se proporciona no puede estar vacía
  if (subcategoria !== undefined && subcategoria.trim() === "") {
    errors.push("Subcategoría no puede estar vacía si se proporciona");
  }

  if (!producto || producto.trim() === "") {
    errors.push("Producto es requerido");
  }

  if (!precio || precio.toString().trim() === "") {
    errors.push("Precio es requerido");
  } else if (isNaN(parseFloat(precio))) {
    errors.push("Precio debe ser un número válido");
  }

  // Descripción es opcional pero si se proporciona no puede estar vacía
  if (descripcion !== undefined && descripcion.trim() === "") {
    errors.push("Descripción no puede estar vacía si se proporciona");
  }

  // Stock es opcional pero si se proporciona debe ser un número válido
  if (stock !== undefined) {
    if (stock.toString().trim() === "") {
      errors.push("Stock no puede estar vacío si se proporciona");
    } else if (isNaN(parseInt(stock)) || parseInt(stock) < 0) {
      errors.push("Stock debe ser un número entero mayor o igual a 0");
    }
  }

  // Imagen es opcional pero si se proporciona debe ser una URL válida
  if (img !== undefined && img.trim() !== "") {
    const urlPattern =
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;
    if (!urlPattern.test(img)) {
      errors.push("Imagen debe ser una URL válida");
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

export const validateMenuItemUpdate = (req, res, next) => {
  const { categoria, subcategoria, producto, precio, descripcion, stock, img } =
    req.body;
  const errors = [];

  // Para actualización, los campos son opcionales pero si se proporcionan deben ser válidos
  if (categoria !== undefined && categoria.trim() === "") {
    errors.push("Categoría no puede estar vacía");
  }

  if (subcategoria !== undefined && subcategoria.trim() === "") {
    errors.push("Subcategoría no puede estar vacía");
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

  if (descripcion !== undefined && descripcion.trim() === "") {
    errors.push("Descripción no puede estar vacía");
  }

  if (stock !== undefined) {
    if (stock.toString().trim() === "") {
      errors.push("Stock no puede estar vacío");
    } else if (isNaN(parseInt(stock)) || parseInt(stock) < 0) {
      errors.push("Stock debe ser un número entero mayor o igual a 0");
    }
  }

  if (img !== undefined && img.trim() !== "") {
    const urlPattern =
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;
    if (!urlPattern.test(img)) {
      errors.push("Imagen debe ser una URL válida");
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
