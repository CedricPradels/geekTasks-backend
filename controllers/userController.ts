import { Request, Response } from "express";

import { isPassword, isEmail, isUsername, isNull } from "../helpers/predicates";
import authentication from "../helpers/authentication";

import User from "../models/User";

interface UserResponse {
  _id: string;
  token: string;
  salt: string;
  hash: string;
  email: string;
  username: string;
}

export default {
  async signup(req: Request, res: Response) {
    try {
      if (req.fields === undefined) throw "Missing body";
      const { username, password, email } = req.fields;
      if ([username, password, email].some((x) => x === undefined))
        throw "Missing parameter";
      if (!isPassword(password)) throw "Incorrect password";
      if (!isEmail(email)) throw "Incorrect email";
      if (!isUsername(username)) throw "Incorrect username";
      const { hash, salt, token } = authentication.generate(String(password));

      await User.create({ username, email, salt, token, hash });

      res.json({ username, token });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  async signin(req: Request, res: Response) {
    try {
      if (req.fields === undefined) throw "Missing body";
      const { password, email } = req.fields;

      const user: UserResponse | null = await User.findOne({ email })
        .select("salt hash token")
        .lean(true);

      if (isNull(user)) throw "User not found";

      if (
        !authentication.isCorrectPassword(
          String(password),
          String(user?.salt),
          String(user?.hash)
        )
      )
        throw "Wrong password";

      res.json(user);
    } catch (error) {
      res.json({ error });
    }
  },
};
