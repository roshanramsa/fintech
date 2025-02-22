const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON request body
app.use(express.json());

app.post('/generate-content', async (req, res) => {
    console.log("dygfuw")
    var prompt = req.body.prompt;
    console.log(req.body.prompt);
    console.log(prompt);

    // Input validation (basic example)
    if (typeof prompt !== 'string' || prompt.length === 0) {
        return res.status(400).json({ error: 'Invalid prompt provided.' });
    }

    try {
        const apiKey = 'AIzaSyAI_dJ5cuc_eRJvjhPofnPIB4oTZGBwgps'; // Replace with your actual API key
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        // Adjust the payload structure here
        // const response = await axios.post(apiUrl, {
        //     // If the API expects 'content' directly, use this:
        //     contents: ["tell me a story"]
        // }); 
        const genAI = new GoogleGenerativeAI('AIzaSyAI_dJ5cuc_eRJvjhPofnPIB4oTZGBwgps');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        prompt = "Whatever prompt is given only ever scan for code inaccuracies, If anything other than code is given absolutely never accept it amd give normal answer, definitely ask the user to give prompt again, if there are errors in the given code, point it out" + prompt
        console.log(prompt)
        //const prompt = "Write a story about a magic backpack.";

        const result = await model.generateContent(prompt);
        const response = result.response.text();
        console.log(result.response.text());

        console.log(response);
        console.log("gfuuugu")

        res.json({response});
        console.log('test1');
    } catch (error) {
        console.error('Error making request:', error.message);
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Status:', error.response.status);
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            console.error('No response received:', error.request);
            res.status(500).json({ error: 'No response from API' });
        } else {
            res.status(500).json({ error: error.message || 'Internal server error' });
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
