import UserModel from "../../database/models/user.model.js";
import encrypt from "../../utils/encrypt.js";
import tokenObject from "../../utils/token.js";

const AuthController = {
  /**
   * @route POST /auth/login
   * @desc Login user
   * @access Public
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
   * @route POST /auth/logout
   * @desc Logout user
   * @access Private
   */
  async logout(req, res) {
    try {
        const authHeader = req.headers['authorization'];
        if(authHeader && authHeader.startsWith("Bearer")){
          const authToken = authHeader.split(' ')[1];
          return res.json({ success: true });
        }
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    } catch (error) {}
  },
};

export default AuthController;
