import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ImageAnnotatorClient } from "@google-cloud/vision";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());

/* -------------------- GEMINI SETUP -------------------- */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* -------------------- RAW IMAGE HANDLER -------------------- */
app.use(
  express.raw({
    type: ["image/png", "image/jpeg", "image/jpg"],
    limit: "10mb",
  })
);

/* -------------------- VISION CLIENT -------------------- */
const visionClient = new ImageAnnotatorClient({
  keyFilename: process.env.VISION_API_KEY,
});

/* -------------------- JSON EXTRACTOR (CRITICAL FIX) -------------------- */
function extractJSON(text) {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No valid JSON found in Gemini response");
  }

  return text.substring(firstBrace, lastBrace + 1);
}

/* -------------------- GEMINI RANKING -------------------- */
async function rankBooksWithPrompt(bookTitles, syllabus) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an academic assistant.

TASK:
1. Identify ONLY books clearly relevant to the users preferences.
2. Ignore unclear or unrelated titles completely.
3. Correct spelling errors.
4. Give each relevant book:
   - title
   - 1–2 line summary
   - relevanceScore (0–10)

VERY IMPORTANT:
- If NO books are relevant:
  - relevantBooks must be an EMPTY array
  - suggestedBook must contain EXACTLY ONE recommended book
- If relevantBooks is NOT empty:
  - suggestedBook MUST be null

Return ONLY valid JSON.
NO markdown.
NO explanations.

Syllabus:
${syllabus}

Book titles:
${bookTitles.join(", ")}

JSON FORMAT (STRICT):

{
  "relevantBooks": [
    {
      "title": "",
      "summary": "",
      "relevanceScore": 0
    }
  ],
  "suggestedBook": {
    "title": "",
    "reason": ""
  }
}
`;

  const result = await model.generateContent(prompt);
  const rawText = result.response.text();

  console.log("RAW GEMINI OUTPUT:\n", rawText);

  const jsonText = extractJSON(rawText);
  const parsed = JSON.parse(jsonText);

  return parsed;
}

app.post("/upload", async (req, res) => {
  try {
    const syllabus = req.headers["x-syllabus"]?.trim();

    if (!req.body || !req.body.length) {
      return res.status(400).json({ error: "No image received" });
    }

    if (!syllabus) {
      return res.status(400).json({ error: "Syllabus is required" });
    }

    const [result] = await visionClient.textDetection({
      image: { content: req.body },
    });

    const ocrText = result.textAnnotations?.[0]?.description || "";

    console.log("OCR TEXT:\n", ocrText);

    if (!ocrText) {
      return res.json({
        rankedBooks: [],
        suggestedBook: {
          title: "No text detected",
          reason: "The image did not contain readable book titles",
        },
      });
    }

    const bookTitles = ocrText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 3);

    const resultData = await rankBooksWithPrompt(bookTitles, syllabus);

    res.json({
      rankedBooks: resultData.relevantBooks || [],
      suggestedBook: resultData.suggestedBook || null,
    });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: "Failed to process books" });
  }
});
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
