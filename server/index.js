require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require('@google/generative-ai');

const app = express();

// Use CORS and JSON middleware
app.use(cors());
app.use(express.json());

const apiKey = "AIzaSyAI_dJ5cuc_eRJvjhPofnPIB4oTZGBwgps"; // Store API key in .env file
const genAI = new GoogleGenerativeAI(apiKey);

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });

app.post('/generate', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        console.log(prompt)
        if (!prompt) return res.status(400).json({ error: "Prompt is required" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "I am the game master. My player is in a game where he has to escape various scams. Act accordingly. Keep the convo concise and within 7 sentences" }],
                },
                {
                    role: "model",
                    parts: [{ text: "Great to meet you. What would you like to know?" }],
                },
            ],
        });

        const result = await chat.sendMessage(prompt);
        res.json({ response: result.response.text() });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
