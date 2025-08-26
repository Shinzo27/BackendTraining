import { TokenUser } from "../../lib/types";

declare global {
  namespace Express {
    interface Request {
      user: TokenUser;
    }
  }
}
