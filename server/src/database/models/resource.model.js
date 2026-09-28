import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';


const sheetSchema = new Schema(
  {
    uid: { type: String, unique: true, default: uuidv4 },
    sheetId: { type: String, required: true },
    title: { type: String, required: true },
    majorDimension: { type: String, enum: ["ROWS", "COLUMNS"], default: "ROWS" },
    range: { type: String, required: [true, "Please provide sheet range"] },
    values: { type: [[Schema.Types.Mixed]], default: [] },
    user: { type: Schema.Types.ObjectId, ref: "Users", index: true }
  },
  {
    timestamps: true,
  }
);

const SheetModel = model("Sheets", sheetSchema);

export default SheetModel;
