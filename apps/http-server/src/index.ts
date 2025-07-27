import express from "express";
import authRouter from "./routes/authRouter";
import roomRouter from "./routes/roomRouter";
import contentRouter from "./routes/contentRouter";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import path from "path";
config({ path: path.resolve(__dirname, "../.env") });
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/content", contentRouter);

console.log("process.env.PORT", process.env.PORT);
console.log("process.env.FRONTEND_ORIGIN", process.env.FRONTEND_ORIGIN);
console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);
console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);
console.log("process.env.SALTROUNDS", process.env.SALTROUNDS);

app.listen(parseInt(process.env.PORT || "3001"), () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
