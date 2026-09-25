import UserModel from "../../database/models/user.model.js";
import encrypt from "../../utils/encrypt.js";
import jwtToken, { TOKEN } from "../../utils/token.js";
import { COOKIES } from "../../utils/constant.js";


const AuthController = {
  /**
   * @route POST /auth/login
   * @desc Login user
   * @access Public
   */
  async find(req, res) {
    try {
      const { username, password } = req.body;
      const { encode } = jwtToken;
      const user = await UserModel.findOne({
        $or: [{ userName: username }, { email: username }],
      });
      if (user) {
        if (encrypt.comparePassword(password, user.password)) {
          const { accessToken, refreshToken } = encode({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
          });

          res.cookie(COOKIES.ACCESS, accessToken, {
              maxAge: 60*60*1000,    
              httpOnly: true,    
              secure: false,     
              sameSite: 'lax',
              path: '/'    
          });

          res.cookie(COOKIES.REFRESH, refreshToken, {
              maxAge: 60*60*1000,    
              httpOnly: true,    
              secure: false,     
              sameSite: 'lax',
              path: '/'    
          });
          
          return res.json({ 
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
            }
          })
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
        const accessToken = req.cookies[COOKIES.ACCESS];
        if(accessToken){
          const cookieOptions = {
            path: '/',         
            httpOnly: true,
            secure: false,     
            sameSite: 'lax'    
          };
          res.clearCookie(COOKIES.ACCESS, cookieOptions);
          res.clearCookie(COOKIES.REFRESH, cookieOptions);
          return res.json({ success: true, message: "Logged out successfully" });
        }
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    } catch (error) {
      throw error
    }
  },

  /**
   * @route POST /auth/self
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

export default AuthController;
