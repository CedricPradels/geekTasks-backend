import User from "../models/User";

import { isNull } from "./predicates";

export default async function findUserIdWithToken(token: string) {
  try {
    const user = await User.findOne({ token }).select("_id").lean(true);
    if (isNull(user)) {
      throw new Error("Incorrect token");
    } else {
      return user?._id;
    }
  } catch (error) {
    return error;
  }
}
