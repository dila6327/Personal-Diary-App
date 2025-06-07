const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(403);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};

router.post('/', auth, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'voice', maxCount: 1 }
]), async (req, res) => {
  try {
    const { note, date } = req.body;
    const image = req.files.image?.[0]?.filename;
    const voice = req.files.voice?.[0]?.filename;

    let mood = "Unknown";
    let recommendations = "AI not available.";

    if (note && note.trim().length > 5) {
      // Use local AI via Ollama
      const prompt = `
Given this journal entry: "${note}"

1. What is the user's emotional mood in ONE word?
2. Suggest 2 or 3 helpful and friendly things they can do today.
Please answer in the format:
Mood: <mood>
Recommendations:
- <rec1>
- <rec2>
      `;

      const ollamaRes = await axios.post('http://localhost:11434/api/generate', {
        model: "mistral",
        prompt: prompt,
        stream: false
      });

      const aiText = ollamaRes.data.response;

      // Parse result
      const moodMatch = aiText.match(/Mood:\s*(.*)/);
      const recMatch = aiText.match(/Recommendations:\s*([\s\S]*)/);

      mood = moodMatch ? moodMatch[1].trim() : "Unknown";
      recommendations = recMatch ? recMatch[1].trim() : "No suggestions found.";
    }

    const entry = new Entry({
      userId: req.user.id,
      date,
      note,
      image,
      voice,
      mood,
      recommendations
    });

    await entry.save();
    res.json({ message: "Entry saved successfully" });
  }  catch (error) {
  console.warn("⚠️ AI/Ollama failed or not running. Using fallback mood and suggestions.");
  console.error("🧠 AI Error:", error?.message || error);

  // 🧠 Fallback mood and dynamic suggestions
  const fallbackSuggestions = [
    "Go for a short walk and enjoy some fresh air.",
    "Take time to reflect on a recent win.",
    "Reach out to someone you care about.",
    "Listen to calming music or meditate.",
    "Write freely about anything on your mind.",
    "Do something creative like drawing or journaling.",
    "Unplug for a moment and enjoy a break from screens."
  ];

  // ✅ Randomly pick 2
  const selected = fallbackSuggestions.sort(() => 0.5 - Math.random()).slice(0, 2);

  const recommendations = selected.map((s) => `- ${s}`).join("\n");

  const entry = new Entry({
    userId: req.user.id,
    date: req.body.date,
    note: req.body.note,
    image: req.files.image?.[0]?.filename,
    voice: req.files.voice?.[0]?.filename,
    mood: "Reflective",
    recommendations
  });

  await entry.save();
  res.json({ message: "Entry saved with fallback suggestions." });
}
});
router.get('/', auth, async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.user.id });
    res.json(entries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
});


module.exports = router;
