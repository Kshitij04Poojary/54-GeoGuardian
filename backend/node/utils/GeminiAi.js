const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const startChatSession = async (userMessage) => {
  try {
      const chatSession = model.startChat({
          generationConfig,
      });
      const response = await chatSession.sendMessage(userMessage);
      if (
          response &&
          response.response &&
          response.response.candidates &&
          response.response.candidates.length > 0
      ) {
          let aiResponseText = response.response.candidates[0].content; 
          let final=aiResponseText.parts[0].text;
          return final;
      } else {
          throw new Error("No valid candidates found in the response.");
      }
  } catch (error) {
      console.error("Error in startChatSession:", error);
      throw new Error("Failed to process the chat session.");
  }
};

module.exports = { startChatSession };