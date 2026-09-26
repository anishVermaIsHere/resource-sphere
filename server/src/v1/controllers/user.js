import { COOKIES, HTTP_CODES } from "../../utils/constant.js";

const { UNAUTHORIZE } = HTTP_CODES;

const UserController = {
  /**
   * @route GET /users/self
   * @desc Fetch self user
   * @access Private
   */
  async self(req, res){
    try {
      res.set("Cache-Control", "no-store");
      const user = req["decode"];
      return res.json({ 
        success: true, 
        user:  { 
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id
        }
      });
    } catch(error){
      throw error
    }
  }
};

export default UserController;
