
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
                        <div className="font-bold text-lg">Rohan Kumar</div>
                        <p className='font-normal text-xs text-gray-500'>rohan_kumar@gmail.com</p>
                    </div>
                </div>
                <div className='flex space-x-3 items-center'>
                    <Link to="/dashboards/details">
                        <button className='px-4 py-2 rounded-full bg-[#3182ce] hover:bg-[#2B6CB0] text-white'>View Profile</button>
                    </Link>
                    <IoMdMore className='text-2xl text-gray-500 cursor-pointer' />
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 space-y-4 bg-[#F9FAFC] py-4 px-3 overflow-y-scroll scrollbar-none">
                {/* Divider for Today's messages */}
                <div className="text-center text-gray-400 text-sm my-2">
                    <span className="px-2">Today</span>
                </div>

                {/* Chat Messages */}
                <div className="flex justify-end">
                    <div className="mr-12 max-w-[28rem] bg-green-500 text-white p-3 rounded-lg">
                        Good morning, Rohan. Have you reviewed the bail application details?
                        <div className="text-xs text-gray-200 text-right mt-1">8:31 PM</div>
                    </div>
                </div>
                <div className="flex items-start">
                    <img
                        src="https://www.keste.com/wp-content/uploads/2021/07/AdobeStock_277727769-1-scaled.jpeg"
                        className="w-8 h-8 rounded-full object-cover object-top"
                        alt="Avatar"
                    />
                    <div className="ml-4 max-w-[28rem] bg-custom-blue text-white p-3 rounded-lg">
                        Yes, I've gone through it. What are the next steps?
                        <div className="text-xs text-gray-200 text-right mt-1">8:32 PM</div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="mr-12 max-w-[28rem] bg-green-500 text-white p-3 rounded-lg">
                        I'll submit it to the court today. Expect a hearing date soon. We should receive confirmation within a week.
                        <div className="text-xs text-gray-200 text-right mt-1">8:33 PM</div>
                    </div>
                </div>
                <div className="flex items-start">
                    <img
                        src="https://www.keste.com/wp-content/uploads/2021/07/AdobeStock_277727769-1-scaled.jpeg"
                        className="w-8 h-8 rounded-full object-cover object-top"
                        alt="Avatar"
                    />
                    <div className="ml-4 max-w-[28rem] bg-custom-blue text-white p-3 rounded-lg">
                        Great, thank you! Please keep me updated.
                        <div className="text-xs text-gray-200 text-right mt-1">8:34 PM</div>
                    </div>
                </div>
                <div className="flex items-start">
                    <img
                        src="https://www.keste.com/wp-content/uploads/2021/07/AdobeStock_277727769-1-scaled.jpeg"
                        className="w-8 h-8 rounded-full object-cover object-top invisible"
                        alt="Avatar"
                    />
                    <div className="ml-4 bg-custom-blue text-white p-3 rounded-lg">
                        Is there anything else I need to prepare for the hearing?
                        <div className="text-xs text-gray-200 text-right mt-1">8:35 PM</div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div className="mr-12 max-w-[28rem] bg-green-500 text-white p-3 rounded-lg">
                        Just bring any additional documents I mentioned in my email. Also, make sure you have a copy of your employment letter and proof of residence ready. They might ask for those during the hearing.
                        <div className="text-xs text-gray-200 text-right mt-1">8:36 PM</div>
                    </div>
                </div>
                <div className="flex items-start">
                    <img
                        src="https://www.keste.com/wp-content/uploads/2021/07/AdobeStock_277727769-1-scaled.jpeg"
                        className="w-8 h-8 rounded-full object-cover object-top"
                        alt="Avatar"
                    />
                    <div className="ml-4 max-w-[28rem] bg-custom-blue text-white p-3 rounded-lg">
                        Got it. Is it likely that the bail will be granted in the first hearing?
                        <div className="text-xs text-gray-200 text-right mt-1">8:37 PM</div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="mr-12 max-w-[28rem] bg-green-500 text-white p-3 rounded-lg">
                        It depends on a few factors, but based on your case details, I’m optimistic.
                        <div className="text-xs text-gray-200 text-right mt-1">8:38 PM</div>
                    </div>
                </div>
                <div className="flex items-start">
                    <img
                        src="https://www.keste.com/wp-content/uploads/2021/07/AdobeStock_277727769-1-scaled.jpeg"
                        className="w-8 h-8 rounded-full object-cover object-top"
                        alt="Avatar"
                    />
                    <div className="ml-4 max-w-[28rem] bg-custom-blue text-white p-3 rounded-lg">
                        That’s a relief to hear.
                        <div className="text-xs text-gray-200 text-right mt-1">8:39 PM</div>
                    </div>
                </div>

            </div>

            {/* Input Area */}
            <div className="flex p-4 bg-[#F9FAFC]">
                <input
                    type="text"
                    placeholder="Type something here..."
                    className="w-full px-4 py-3 border rounded-md focus:outline-none"
                />
                <button className="bg-custom-blue text-white px-4 py-2 rounded ml-2">
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;