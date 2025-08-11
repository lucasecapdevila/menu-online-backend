import googleSheetsService from "../services/googleSheetsService.js";
import { HTTP_STATUS } from "../utils/constants.js";

export const getAllMenuItems = async (req, res) => {
  const data = await googleSheetsService.readAllRows();
  res.json(data);
};

export const createMenuItem = async (req, res) => {
  const newItem = await googleSheetsService.createItem(req.body);
  res.status(HTTP_STATUS.CREATED).json(newItem);
};

export const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const updatedItem = await googleSheetsService.updateItem(id, req.body);
  res.json(updatedItem);
};

export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  const result = await googleSheetsService.deleteItem(id);
  res.json(result);
};
