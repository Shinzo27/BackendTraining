import { TokenUser } from "../../Lib/Types";

declare global {
  namespace Express {
    interface Request {
      user?: TokenUser;
    }
  }
}
