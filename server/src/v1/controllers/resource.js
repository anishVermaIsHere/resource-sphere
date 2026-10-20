import * as fs from "node:fs";
import UserModel from "../../database/models/user.model.js";
import SheetModel from "../../database/models/resource.model.js";
import encrypt from "../../utils/encrypt.js";
import { getSpreadSheet } from "../../utils/google.js";
import tokenObject from "../../utils/token.js";
import handleFileMetadata from "../../utils/file-meta.js";
import { HTTP_CODES } from "../../utils/constant.js";


const { RESOURCE_NOT_FOUND, UNAUTHORIZE, SUCCESS } = HTTP_CODES;


const ResourceController = {
  /**
   * @route POST /auth
   * @desc Login user
   * @access Private
   */
  async find(req, res) {
    try {
      const { username, password } = req.body;
      const { tokenEncode } = tokenObject;
      const user = await UserModel.findOne({
        $or: [{ userName: username }, { email: username }],
      });
      if (user) {
        if (encrypt.comparePassword(password, user.password)) {
          const { accessToken, refreshToken } = tokenEncode({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
          });

          return res.status(200).json({
            user: {
              id: user._id,
              uid: user.uid,
              firstName: user.firstName,
              lastName: user.lastName,
              fullName: user.firstName + " " + user.lastName,
              userName: user.userName,
              email: user.email,
              gender: user.gender,
              avatar: user.avatar
            },
            accessToken,
            refreshToken,
          });
        }
      }
      return res.status(404).json({ message: "User not exist" });
    } catch (error) {}
  },
  /**
   * @route POST /
   * @desc Create google sheet data,
   * @access Private
   */
  async create(req, res){
    try {
        const { spreadSheetId, sheetTitle } = req.body;
        const sheet = await getSpreadSheet(spreadSheetId, sheetTitle);
        if(sheet?.data){
          const { values, majorDimension, range } = sheet.data;
          const document = {
            user: req["decoded"]?.id,
            sheetId: spreadSheetId,
            title: sheetTitle,
            majorDimension,
            values,
            range
          }

          const doc = await SheetModel.create(document);
          return res.json(doc);
        }
        return doc;
    } catch (error) {
        console.log('error', error);
    }
  },
  /**
   * @route GET /
   * @desc Fetch google sheets data,
   * @access Private
   */
  async get(req, res){
    try {
      const docs = await SheetModel.find();
      return res.json(docs);
    } catch (error) {
      console.log('error', error);
    }
  },
  async uploadFile(req, res){
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }
      const filePath = req.file.path;
      await handleFileMetadata(filePath);
      res.setHeader("X-File-Name", encodeURIComponent(req.file.filename));
      
      res.download(filePath, req.file.originalname, async (error) => {
        try {
          await fs.promises.unlink(filePath);
        } catch (err) {
          console.error("Failed to delete temporary file:", err);
        }
        if (error) {
          console.error("Download error:", error);
        }
      });
      // return res.status(SUCCESS).json({ message: "File uploaded" });
    } catch(error) {
      console.log('error', error);
    }
  }
};

export default ResourceController;
