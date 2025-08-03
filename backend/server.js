import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/ai.routes.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;
await connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Server is live");
});

app.use(requireAuth());

app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});
