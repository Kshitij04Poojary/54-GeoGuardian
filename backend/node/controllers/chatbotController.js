const { startChatSession } = require("../utils/geminiAI");

const handleChat = async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: "Query is required." });
    }

    try {
        const aiResponse = await startChatSession(query);
        res.status(200).json({ reply: aiResponse });
    } catch (error) {
        console.error("Error in handleChat:", error);
        res.status(500).json({ error: "Failed to process the request." });
    }
};

module.exports = { handleChat };
