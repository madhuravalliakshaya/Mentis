import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ImageAnnotatorClient } from "@google-cloud/vision";

dotenv.config();

const app = express();
app.use(cors());

// Accept raw images
app.use(
  express.raw({
    type: ["image/png", "image/jpeg", "image/jpg"], // Accept all common image types
    limit: "10mb",
  })
);

// Vision OCR client
const visionClient = new ImageAnnotatorClient({
  keyFilename: process.env.VISION_API_KEY,
});

// Dummy Gemini function (replace with Gemini API later)
async function rankBooksWithPrompt(bookTitles, syllabus) {
  return bookTitles.map((title, i) => ({
    title,
    summary: `Placeholder summary for "${title}"`,
    relevanceScore: Math.max(0, 10 - i),
  }));
}

// -------------------- Endpoint --------------------
app.post("/upload", async (req, res) => {
  try {
    const syllabus = req.headers["x-syllabus"]?.trim();

    console.log("Headers:", req.headers);
    console.log("Body length:", req.body?.length);
    console.log("Syllabus:", syllabus);

    if (!req.body || !req.body.length) {
      return res.status(400).json({ error: "No image received" });
    }

    if (!syllabus) {
      return res.status(400).json({ error: "Syllabus required" });
    }

    // OCR
    const [result] = await visionClient.textDetection({
      image: { content: req.body },
    });

    const ocrText = result.textAnnotations?.[0]?.description || "";
    if (!ocrText) return res.json({ rankedBooks: [] });

    const bookTitles = ocrText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    console.log("✅ OCR Titles:", bookTitles);

    const rankedBooks = await rankBooksWithPrompt(bookTitles, syllabus);
    res.json({ rankedBooks });
  } catch (err) {
    console.error("Error processing books:", err);
    res.status(500).json({ error: "Failed to process books" });
  }
});

app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);
