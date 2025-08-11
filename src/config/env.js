import dotenv from "dotenv";

dotenv.config();

// Validar variables de entorno requeridas
const requiredEnvVars = [
  "GOOGLE_SHEET_ID",
  "GOOGLE_CLIENT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Variable de entorno requerida no encontrada: ${envVar}`);
  }
}

export const config = {
  port: process.env.PORT || 3000,
  googleSheets: {
    sheetId: process.env.GOOGLE_SHEET_ID,
    sheetName: process.env.GOOGLE_SHEET_NAME || "Hoja1",
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    privateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
};
