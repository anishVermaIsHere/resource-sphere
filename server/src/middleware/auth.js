import jwtToken, { TOKEN } from "../utils/token.js";
import { COOKIES, HTTP_CODES } from "../utils/constant.js";

const { UNAUTHORIZE } = HTTP_CODES;

export default async function requireAuth(req, res, next){
    try {
        const token = req.cookies[COOKIES.ACCESS];
        const isVerified = jwtToken.decode(token, TOKEN['ACCESS_TOKEN'], req);
        if(isVerified){
            next();
        } else {
            res.status(UNAUTHORIZE).json({message: "Unauthorize user"});
        }
    } catch (error) {
        res.status(UNAUTHORIZE).json({ message: "Unauthorized" });
    }
}