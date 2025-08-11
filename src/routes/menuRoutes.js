import express from "express";
import {
  getAllMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";
import {
  validateMenuItemCreate,
  validateMenuItemUpdate,
  validateId,
} from "../middleware/validation.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = express.Router();

// GET /menu -> lista todos
router.get("/", asyncHandler(getAllMenuItems));

// POST /menu -> crea nuevo item
router.post("/", validateMenuItemCreate, asyncHandler(createMenuItem));

// PUT /menu/:id -> actualiza item
router.put(
  "/:id",
  validateId,
  validateMenuItemUpdate,
  asyncHandler(updateMenuItem)
);

// DELETE /menu/:id -> borra item
router.delete("/:id", validateId, asyncHandler(deleteMenuItem));

export default router;
