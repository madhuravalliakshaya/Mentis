import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
// Load your API key (from env or hardcoded for testing)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  // Use a valid model name (gemini-1.5-flash or gemini-1.5-pro)
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent("Hello Gemini!");
  console.log(result.response.text());
}

run().catch(err => console.error("Error:", err));