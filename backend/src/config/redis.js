import { createClient } from "redis";
import dotenv from "dotenv";

// Load environment variables before creating client
dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("connect", () => {
  console.log("Redis Connected");
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

const connectRedis = async () => {
  await redisClient.connect();
};

export { redisClient, connectRedis };