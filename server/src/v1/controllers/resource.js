import { getGoogleSheet } from "../../../../client/src/lib/utils.js";
import UserModel from "../../database/models/user.model.js";
import SheetModel from "../../database/models/resource.model.js";
import encrypt from "../../utils/encrypt.js";
import { getSpreadSheet } from "../../utils/google.js";
import tokenObject from "../../utils/token.js";



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
  }
};

export default ResourceController;
