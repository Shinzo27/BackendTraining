import { User } from "../../Lib/Types";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
