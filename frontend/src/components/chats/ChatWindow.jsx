
import { Link } from 'react-router-dom';
import { IoMdMore } from "react-icons/io";

const ChatWindow = () => {
    return (
        <div className="flex-1 flex flex-col justify-between bg-white h-screen">
            {/* Header with Contact Name */}
            <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-[#F9FAFC]">
                <div className='flex'>
                    <div className="flex items-center space-x-2">
                        {/* Avatar */}
                        <img
                            src="https://www.keste.com/wp-content/uploads/2021/07/AdobeStock_277727769-1-scaled.jpeg"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full border-2 border-gray-300 mx-3 object-cover object-top"
                        />
                    </div>
                    <div>
                        <div className="font-bold text-lg">ABC</div>
                        <p className='font-normal text-xs text-gray-500'>ABC@gmail.com</p>
                    </div>
                </div>
                <div className='flex space-x-3 items-center'>
                    {/* <Link to="/dashboards/details">
                        <button className='px-4 py-2 rounded-full bg-[#3182ce] hover:bg-[#2B6CB0] text-white'>View Profile</button>
                    </Link> */}
                    <IoMdMore className='text-2xl text-gray-500 cursor-pointer' />
                </div>
            </div>

            {/* Input Area */}
            <div className="flex p-4 bg-[#F9FAFC]">
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