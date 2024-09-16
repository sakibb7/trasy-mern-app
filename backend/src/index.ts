import "dotenv/config";
import express from "express";
import cors from "cors";
import { APP_ORIGIN } from "./constants/env";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db";
import authRoutes from "./routes/auth.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());

app.get("/", (req, res, next) => {
  return res.status(200).json({ status: "Healthy" });
});

//auth routes
app.use("/auth", authRoutes);

app.listen(4005, async () => {
  console.log("App is running on port 4005 in developent environment");
  await connectToDatabase();
});
