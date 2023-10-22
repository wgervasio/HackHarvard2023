import { AppDataSource } from "./db";
import "reflect-metadata";
const express = require("express");
const cors = require('cors');
const app = express();
const port = 8000;

AppDataSource.initialize()
  .then(() => console.log("CockroachDB connected"))
  .catch((e) => console.log(e));

app.use(express.json());
app.use(cors());

app.use("/api/v1/data", require("./routes/data"));

app.listen(port, () => console.log(`Server running on Port ${port}`));

const corsOptions = {
  origin: 'exp://jt4rvdo.anonymous.8081.exp.direct',
  methods: 'GET,PUT',
  credentials: true,
};

app.use(cors(corsOptions));