import { google } from "googleapis";
import { config } from "../config/env.js";
import { SHEET_RANGE } from "../utils/constants.js";

class GoogleSheetsService {
  constructor() {
    this.sheetId = config.googleSheets.sheetId;
    this.sheetName = config.googleSheets.sheetName;
    this.range = `${this.sheetName}!${SHEET_RANGE}`;
  }

  async getSheets() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: config.googleSheets.clientEmail,
        private_key: config.googleSheets.privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const client = await auth.getClient();
    return google.sheets({ version: "v4", auth: client });
  }

  async readAllRows() {
    const sheets = await this.getSheets();
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: this.sheetId,
      range: this.range,
    });
    const rows = res.data.values || [];
    if (rows.length <= 1) return [];

    const headers = rows[0];
    return rows.slice(1).map((r, idx) => {
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = r[i] ?? "";
      });
      obj._rowNumber = idx + 2;
      return obj;
    });
  }

  async createItem(itemData) {
    const {
      categoria = "",
      producto = "",
      precio = "",
      descripcion = "",
      imagen = "",
    } = itemData;
    const id = Date.now().toString();
    const sheets = await this.getSheets();

    await sheets.spreadsheets.values.append({
      spreadsheetId: this.sheetId,
      range: this.range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[id, categoria, producto, precio, descripcion, imagen]],
      },
    });

    return { id, categoria, producto, precio, descripcion, imagen };
  }

  async updateItem(id, updateData) {
    const sheets = await this.getSheets();
    const raw = await sheets.spreadsheets.values.get({
      spreadsheetId: this.sheetId,
      range: this.range,
    });
    const rows = raw.data.values || [];
    if (rows.length <= 1) {
      throw new Error("No hay datos");
    }

    const headers = rows[0];
    let foundIndex = -1;
    for (let i = 1; i < rows.length; i++) {
      if ((rows[i][0] ?? "") === id) {
        foundIndex = i;
        break;
      }
    }
    if (foundIndex === -1) {
      throw new Error("ID no encontrado");
    }

    const existing = rows[foundIndex];
    const newRow = [
      id,
      updateData.categoria ?? existing[1] ?? "",
      updateData.producto ?? existing[2] ?? "",
      updateData.precio ?? existing[3] ?? "",
      updateData.descripcion ?? existing[4] ?? "",
      updateData.imagen ?? existing[5] ?? "",
    ];

    const spreadsheetRow = foundIndex + 1;
    const updateRange = `${this.sheetName}!A${spreadsheetRow + 1}:F${
      spreadsheetRow + 1
    }`;

    await sheets.spreadsheets.values.update({
      spreadsheetId: this.sheetId,
      range: updateRange,
      valueInputOption: "USER_ENTERED",
      resource: { values: [newRow] },
    });

    return {
      id,
      ...Object.fromEntries(headers.map((h, i) => [h, newRow[i]])),
    };
  }

  async deleteItem(id) {
    const sheets = await this.getSheets();
    const raw = await sheets.spreadsheets.values.get({
      spreadsheetId: this.sheetId,
      range: this.range,
    });
    const rows = raw.data.values || [];
    if (rows.length <= 1) {
      throw new Error("No hay datos");
    }

    let foundIndex = -1;
    for (let i = 1; i < rows.length; i++) {
      if ((rows[i][0] ?? "") === id) {
        foundIndex = i;
        break;
      }
    }
    if (foundIndex === -1) {
      throw new Error("ID no encontrado");
    }

    const spreadsheetRow = foundIndex + 1;
    const meta = await sheets.spreadsheets.get({ spreadsheetId: this.sheetId });
    const sheetObj = meta.data.sheets.find(
      (s) => s.properties.title === this.sheetName
    );
    if (!sheetObj) {
      throw new Error("No pude obtener sheetId");
    }
    const sheetId = sheetObj.properties.sheetId;

    const startIndex = spreadsheetRow - 1;
    const endIndex = spreadsheetRow;

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: this.sheetId,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId,
                dimension: "ROWS",
                startIndex,
                endIndex,
              },
            },
          },
        ],
      },
    });

    return { success: true, id };
  }
}

export default new GoogleSheetsService();
