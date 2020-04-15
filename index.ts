require("dotenv").config();

const express = require("express");
import { Request, Response } from "express";
const app = express();
const cors = require("cors");
app.use(cors());
const formidableMiddleware = require("express-formidable");
app.use(formidableMiddleware());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.all("*", (req: Request, res: Response) => {
  res.json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => console.log("Server's running..."));
