import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, MessageCircle, X, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

const LoadingDots = () => (
  <div className="flex gap-1">
    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
  </div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await axios.post("http://localhost:8000/api/chatbot", {
        query: input,
      });

      setMessages([...newMessages, { text: response.data.reply, sender: "bot" }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...newMessages, { text: "Error: Unable to connect to AI", sender: "bot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const formatMarkdown = (text) => {
    // Add proper spacing after bullet points and numbers
    return text.replace(/^([*-]|\d+\.)\s*/gm, '$1 ');
  };

  return (
    <>
      {!isOpen && (
        <button
          className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out"
          onClick={toggleChat}
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[500px] h-[700px] bg-white shadow-2xl rounded-xl flex flex-col">
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white px-6 py-4 flex justify-between items-center rounded-t-xl">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <span className="text-lg font-semibold">AI Assistant</span>
            </div>
            <button 
              onClick={toggleChat}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4" 
            ref={chatContainerRef}
            style={{ scrollbarWidth: 'thin' }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} gap-2 items-end`}
              >
                {msg.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Bot size={20} className="text-indigo-600" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <ReactMarkdown 
                    className={`text-sm leading-relaxed prose ${
                      msg.sender === "user" ? "text-white text-right" : "text-gray-800 text-left"
                    } prose-headings:font-semibold prose-p:my-1 prose-li:my-0 prose-ul:my-1 prose-ol:my-1 prose-pre:my-1 prose-pre:bg-gray-800/5 prose-pre:rounded prose-p:text-left prose-headings:text-left`}
                  >
                    {formatMarkdown(msg.text)}
                  </ReactMarkdown>
                </div>
                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Loading Animation */}
            {isLoading && (
              <div className="flex gap-2 items-end fade-in">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Bot size={20} className="text-indigo-600" />
                </div>
                <div className="bg-gray-100 py-3 px-4 rounded-2xl rounded-tl-none inline-flex items-center">
                  <LoadingDots />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-full transition-all ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                }`}
                onClick={sendMessage}
                disabled={isLoading}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Chatbot;