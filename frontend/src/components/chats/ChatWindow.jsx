
import { Link } from 'react-router-dom';
import { IoMdMore } from "react-icons/io";

const ChatWindow = () => {
    return (
        <div className="flex-1 flex flex-col justify-between bg-white h-screen">
            {/* Header with Contact Name */}

            {/* Input Area */}
            <div className="flex p-4 bg-[#F9FAFC] mt-auto">
                <input
                    type="text"
                    placeholder="Type something here..."
                    className="w-full px-4 py-3 border rounded-md focus:outline-none"
                />
                <button className="bg-blue-400 text-white px-4 py-2 rounded ml-2">
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;