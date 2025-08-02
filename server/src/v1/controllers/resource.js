import { getGoogleSheet } from "../../../../client/src/lib/utils.js";
import UserModel from "../../database/models/user.model.js";
import encrypt from "../../utils/encrypt.js";
import { getSheetData } from "../../utils/google.js";
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
        const { spreadsheetId } = req.body;
      const res = await getSheetData(spreadsheetId);
      console.log('res', res);
    } catch (error) {
        console.log('error', error);
    }
  }
};

export default ResourceController;
