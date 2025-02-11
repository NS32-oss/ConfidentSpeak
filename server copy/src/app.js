import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { generalLimiter } from "./middlewares/rateLimiter.js";
import helmet from "helmet";
import morgan from "morgan";

// Load environment variables
dotenv.config();

const app = express();

// Hardcoded allowed origins
const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  "https://example.com",
  "https://my-tube-app.vercel.app",
  "http://localhost:3001",
];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || origin === "null") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Security headers
app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "DENY"); // or "SAMEORIGIN"
  res.setHeader("Content-Security-Policy", "frame-ancestors 'none';");
  next();
});

// Additional security and logging middleware
app.use(helmet());
app.use(morgan("combined"));
app.use(generalLimiter);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Import and declare routes
import userRouter from "./routes/user.router.js";
import subscriptionRouter from "./routes/subscription.router.js";
import videoRouter from "./routes/video.router.js";
import commentRouter from "./routes/comment.router.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscription", subscriptionRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/comment", commentRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// Log a message indicating the app is running
console.log("App.js is running");

// Export the app instance
export default app;
