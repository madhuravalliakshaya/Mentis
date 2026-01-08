import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import uploadHandler from "./vision.js";

const app = express();
app.use(cors());
app.use(express.raw({ type: "*/*", limit: "10mb" }));

app.post("/upload", uploadHandler);

export const api = functions.https.onRequest(app);
