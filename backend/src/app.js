
// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";


// import authRouter from "./routes/auth.routes.js";
// import interviewRouter from "./routes/interview.routes.js";
// import profileRouter from "./routes/profile.routes.js";
// import dotenv from "dotenv";
// dotenv.config();


// const app = express();

// app.use(express.json());
// app.use(cookieParser());
// const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"].filter(Boolean);
// console.log(allowedOrigins, "allowedOrigins");

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.some((allowedOrigin) => origin.startsWith(allowedOrigin))) {
//         return callback(null, true);
//       }

//       return callback(new Error("Not allowed by CORS"));
//     },
//     credentials: true,
//   })
// );




// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.originalUrl}`);
//   next();
// });

// app.get("/api/test", (req, res) => {
//   res.json({ message: "Backend is working" });
// });
// // Routes
// app.use("/api/auth", authRouter);
// app.use("/api/interview", interviewRouter);
// app.use("/api/profile", profileRouter);

// console.log("Registering auth routes...");
// export default app;

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";

import connectDB from "./db/index.js";

import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";
import profileRouter from "./routes/profile.routes.js";

dotenv.config();

const app = express();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests. Please try again later.",
  },
});

// Connect MongoDB
try {
  await connectDB();
  console.log("✅ MongoDB Connected");
} catch (err) {
  console.error("❌ MongoDB Connection Failed");
  console.error(err);
}

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
].filter(Boolean);

console.log(allowedOrigins, "allowedOrigins");

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  console.log("Mongo Ready State:", mongoose.connection.readyState);
  next();
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend is working",
    mongoState: mongoose.connection.readyState,
  });
});

app.use("/api/auth/register", authLimiter);
app.use("/api/auth/login", authLimiter);

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/profile", profileRouter);

export default app;