import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getGoogleSheet(sheetUrl) {
  const originalUrl = sheetUrl;
  const SPREADSHEET_ID = sheetUrl.split("/")[5];
  const url = new URL(sheetUrl);
  const SHEET_ID = url.searchParams.get("gid").split("#")[0];
  return { spreadSheetId: SPREADSHEET_ID, sheetId: SHEET_ID };
}
