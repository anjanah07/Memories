import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
dotenv.config();
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustonAuth = token.length < 500;
    let decodedData;
    if (token && isCustonAuth) {
      decodedData = jwt.verify(token, process.env.JWTSECRET);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
      const client = new OAuth2Client(process.env.CLIENTID);
      async function verify() {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.CLIENTID,
        });
        const payload = ticket.getPayload();
        req.userId = payload["sub"];
      }
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
export default auth;
