import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import router from "./routes";

const app = express();
const port = process.env.PORT || 4949;

app.use(cors());
app.use(express.json());
require("dotenv").config();

const uri = process.env.MONGODB_URI.replace(
  "<password>",
  process.env.MONGODB_PASS
);

mongoose
  .connect(uri)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use("/api/v1.0", router);

app.get("/", (_req, res) => {
  res.status(200).json({
    status: "success",
    app: {
      version: "1.0",
      build: "development",
    },
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});