import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    error: "Too many requests. Please try again later.",
  },
  headers: true,
});

export default rateLimiter;