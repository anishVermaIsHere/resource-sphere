import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getGoogleSheet(sheetUrl) {
  const originalUrl = sheetUrl;
  const SPREADSHEET_ID = sheetUrl.split("/")[5];
  const params = new URLSearchParams(sheetUrl);
  const SHEET_ID = params.get("gid").split("#")[0];
  // https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit?gid=SHEET_ID#gid=
  // https://docs.google.com/spreadsheets/d/1vULDTDRes8_lXBIzynDPmb02fBwQ16Q0/edit?pli=1&gid=2069070558#gid=2069070558
  // https://docs.google.com/spreadsheets/d/1vULDTDRes8_lXBIzynDPmb02fBwQ16Q0/edit?usp=sharing&ouid=109607553866608228161&rtpof=true&sd=true

  return { spreadSheetId: SPREADSHEET_ID, sheetId: SHEET_ID };
}
