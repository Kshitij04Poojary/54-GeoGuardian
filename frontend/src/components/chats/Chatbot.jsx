import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, MessageCircle } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post("http://localhost:8000/api/chatbot", {
        query: input, // ✅ Fixed key to match backend
      });

      setMessages([...newMessages, { text: response.data.reply, sender: "bot" }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...newMessages, { text: "Error: Unable to connect to AI", sender: "bot" }]);
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg cursor-pointer"
          onClick={toggleChat}
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 w-80 h-[85vh] bg-white shadow-lg rounded-t-lg flex flex-col border border-gray-300">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
            <span>AI Chatbot</span>
            <button onClick={toggleChat} className="text-white">✖</button>
          </div>

          {/* Chat Messages */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 rounded-md max-w-[75%] ${msg.sender === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-black"}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-2 border-t flex">
            <input
              type="text"
              className="flex-1 px-3 py-2 border rounded-l focus:outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="bg-blue-600 text-white px-4 rounded-r" onClick={sendMessage}>
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
