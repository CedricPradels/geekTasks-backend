import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
app.use(cors());
import formidableMiddleware from "express-formidable";
app.use(formidableMiddleware());

import mongoose from "mongoose";
mongoose.connect(`${process.env.MONGODB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

import project from "./routes/project";
app.use(project);

import context from "./routes/context";
app.use(context);

import task from "./routes/task";
app.use(task);

app.all("*", (req: Request, res: Response) => {
  res.json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => console.log("Server's running..."));
