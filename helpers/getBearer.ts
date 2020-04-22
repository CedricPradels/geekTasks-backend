import { Request } from "express";

export default function (req: Request) {
  if (req.headers.authorization) {
    return req.headers.authorization.replace("Bearer ", "");
  } else {
    return new Error("Token needed.");
  }
}
