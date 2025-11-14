import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Gemini Model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api/chat", async (req, res) => {
  try {
    const prompt = req.body.message;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error: " + err.message });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
