import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ImageAnnotatorClient } from "@google-cloud/vision";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(
  express.raw({
    type: ["image/png", "image/jpeg", "image/jpg"],
    limit: "10mb",
  })
);

const visionClient = new ImageAnnotatorClient({
  keyFilename: process.env.VISION_API_KEY,
});

async function rankBooksWithPrompt(bookTitles, syllabus) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are given a list of book titles extracted using OCR.
1. First, correct spelling errors in book titles.
2.give them score based on relevance to the syllabus out of 10 .
3. Return STRICT JSON only.

Syllabus:
${syllabus}

Books:
${bookTitles.join(", ")}

JSON format:
[
  {
    "title": "",
    "summary": "",
    "relevanceScore": 0
  }
]

Optionally suggest ONE better book if none are relevant.
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const cleaned = text.replace(/```json|```/g, "").trim();

  return JSON.parse(cleaned);
}

app.post("/upload", async (req, res) => {
  try {
    const syllabus = req.headers["x-syllabus"]?.trim();

    if (!req.body || !req.body.length) {
      return res.status(400).json({ error: "No image received" });
    }

    if (!syllabus) {
      return res.status(400).json({ error: "Syllabus required" });
    }
    const [result] = await visionClient.textDetection({
      image: { content: req.body },
    });

    const ocrText = result.textAnnotations?.[0]?.description || "";

    if (!ocrText) {
      return res.json({ rankedBooks: [] });
    }

    const bookTitles = ocrText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 2);

    const rankedBooks = await rankBooksWithPrompt(bookTitles, syllabus);

    res.json({ rankedBooks });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to process books" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
