import { JwtPayload } from "jsonwebtoken";

export interface RequestWithUser extends Request {
  user: JwtPayload;
}
