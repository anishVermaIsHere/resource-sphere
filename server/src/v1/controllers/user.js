import { COOKIES } from "../../utils/constant";


const UserController = {
  /**
   * @route POST /user/self
   * @desc Fetch self user
   * @access Private
   */
  async self(req, res){
    try {
        const accessToken = req.cookies[COOKIES.ACCESS];
        if(accessToken){
          return res.json({ success: true });
        }
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    } catch(error){
      throw error
    }
  }
};

export default UserController;
