import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getSheetData(SPREADSHEET_ID) {
  const auth = new GoogleAuth({
    keyFilename: "/path/to/your/service-account-key.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = SPREADSHEET_ID; // Replace with your spreadsheet ID from the URL
  const range = "Sheet1!A1:E"; // Replace with your sheet name and desired range

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (rows.length) {
      console.log("Sheet Data:");
      rows.forEach((row) => {
        console.log(row.join(", "));
      });
    } else {
      console.log("No data found.");
    }
  } catch (err) {
    console.error("The API returned an error:", err);
  }
}

export { getSheetData };
