import { AppDataSource } from "./db";
import "reflect-metadata";
const express = require("express");
const app = express();
const port = 8000;

AppDataSource.initialize()
  .then(() => console.log("CockroachDB connected"))
  .catch((e) => console.log(e));

app.use(express.json());

app.use("/api/v1/data", require("./routes/data"));

app.listen(port, () => console.log(`Server running on Port ${port}`));