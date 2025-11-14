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
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // System prompt to constrain AI responses to cybersecurity for healthcare
    const systemPrompt = `You are a specialized AI-Generated Cyber Awareness Coach for Healthcare Staff. Your role is to provide guidance, training, and answers ONLY related to cybersecurity awareness, best practices, threats, and protection measures specifically for healthcare organizations and medical staff.

SCOPE: You should only respond to questions about:
- Healthcare cybersecurity threats (ransomware, phishing, malware)
- HIPAA compliance and data protection
- Medical device security
- Patient data privacy and security
- Healthcare network security
- Incident response for healthcare settings
- Cybersecurity training for medical staff
- Healthcare-specific security policies and procedures
- Electronic health record (EHR) security
- Telehealth security measures

If the user asks about topics outside of healthcare cybersecurity, respond with:
"I'm specialized in healthcare cybersecurity awareness. Please ask me questions related to cybersecurity threats, data protection, HIPAA compliance, or security best practices for healthcare organizations and medical staff."

User question: ${userMessage}`;

    const result = await model.generateContent(systemPrompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error: " + err.message });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
