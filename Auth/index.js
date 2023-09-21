// This file is parsing the JWT token into user data
import { expressjwt } from "express-jwt";

const secret = process.env.JWT_SECRET;

export const authMiddleware = expressjwt({
  algorithms: ["HS256"],
  credentialsRequired: false,
  secret,
});
