import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import AppConfig from "../config/app.config.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function getSpreadSheet(SPREADSHEET_ID, SHEET_TITLE) {
  const auth = new GoogleAuth({
    keyFilename: AppConfig.google.serviceKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = SPREADSHEET_ID; // Replace with your spreadsheet ID from the URL
  const defaultRange = "Sheet1!A1:E"; // Replace with your sheet name and desired range

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: SHEET_TITLE
    });
    return response;
  } catch (err) {
    console.error("The API returned an error:", err);
  }
}

