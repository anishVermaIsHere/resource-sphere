import UserModel from "../../database/models/user.model.js";

const UserController = {
  /**
   * @route POST /users
   * @desc Create user
   * @access Public
   */
  async create(req, res) {
    try {
      const { userName, password } = req.body;
      await UserModel.create({ userName, password });
    } catch (error) {
      console.log("API: register user error", error.message);
      throw new Error(error.message);
    }
  },
  /**
   * @route GET /user
   * @desc Search user
   * @access Public
   */
  async search(req, res) {
    try {
      const user = req.params.id;
      const userDoc = await UserModel.findOne({
        $or: [{ _id: user }, { userName: user, email: user }],
      });
      if (userDoc) {
        return res
          .status(200)
          .json({ message: "User already exist", success: true });
      }
      return res.status(404).json({ message: "User not found" });
    } catch (error) {
      console.log("API: find user error", error.message);
      throw new Error(error.message);
    }
  },
  /**
   * @route GET /user
   * @desc Find user details
   * @access Public
   */

  async findDetails(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserModel.findOne({ _id: userId });
      if (user) {
        return res.status(200).json({
          id: user._id,
          uid: user.uid,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.firstName + " " + user.lastName,
          userName: user.userName,
          email: user.email,
          gender: user.gender,
          avatar: user.avatar
        });
      }
      return res.status(404).json({ message: "User not found" });
    } catch (error) {
      console.log("API: find user error", error.message);
      throw new Error(error.message);
    }
  },
};

export default UserController;
