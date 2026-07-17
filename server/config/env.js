import dotenv from "dotenv";

console.log("Loading .env...");
const result = dotenv.config();
console.log(result);