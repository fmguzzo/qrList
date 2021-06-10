import { config } from "dotenv";
config();

export default {
  mongoUri: process.env.MONGO_URI,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  fbClientId: process.env.FB_CLIENT_ID,
  fbClientSecret: process.env.FB_CLIENT_SECRET,
};