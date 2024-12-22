import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import { userRouter } from "./routes/user.route.js";
import cors from "cors";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", userRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(` Server running at : http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(`ERROR connecting with DB .catch : ${error} `);
  });
