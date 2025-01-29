import { useEffect, useState, useRef, useCallback, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { MessageCircle, Send, Filter } from "lucide-react";

const ChatWindow = () => {
    // ... all existing state and functions remain the same ...
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [filter, setFilter] = useState("");
    const loader = useRef(null);
    const { user } = useContext(UserContext);

    const fetchPosts = useCallback(async () => {
        if (!hasMore) return;
        try {
            const res = await axios.get(`http://localhost:8000/api/forum?page=${page}&limit=20&userType=${filter}`);
            if (res.data.data.length === 0) {
                setHasMore(false);
            } else {
                setPosts((prevPosts) => [...prevPosts, ...res.data.data]);
                setPage((prevPage) => prevPage + 1);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, [page, hasMore, filter]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchPosts();
                }
            },
            { threshold: 1 }
        );

        if (loader.current) observer.observe(loader.current);
        return () => observer.disconnect();
    }, [fetchPosts]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const allowedUserTypes = ["Admin", "Organization", "NGO"];
        const userType = user?.user?.userType;
        
        if (!allowedUserTypes.includes(userType)) {
            alert("You are not allowed to post messages.");
            return;
        }

        const username = user?.user?.username || "Anonymous";

        try {
            const res = await axios.post("http://localhost:8000/api/forum", {
                username,
                userType,
                message,
            });
            setPosts([res.data.data, ...posts]);
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setPosts([]);
        setPage(1);
        setHasMore(true);
    };

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-400 to-purple-400 shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <MessageCircle className="h-6 w-6 text-white" />
                        <h2 className="text-xl font-bold text-white">Forum Chat</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Filter className="h-5 w-5 text-indigo-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <select
                                className="pl-10 pr-4 py-2 cursor-pointer rounded-full border-2 border-indigo-100 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-sm bg-white transition-all duration-200 hover:border-indigo-200"
                                onChange={handleFilterChange}
                                value={filter}
                            >
                                <option value="">All User Types</option>
                                <option value="Admin">Admin</option>
                                <option value="Organization">Organization</option>
                                <option value="NGO">NGO</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {posts
                    .slice()
                    .reverse()
                    .map((post, index) => (
                        <div
                            key={index}
                            className="group relative cursor-pointer p-4 bg-white rounded-2xl border border-indigo-50 transition-all duration-300 hover:border-indigo-100"
                        >
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center transform transition-transform group-hover:scale-110">
                                    <span className="text-white font-bold">
                                        {post.username[0].toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-800">{post.username}</span>
                                    <span className="text-sm text-indigo-500 ml-2 px-2 py-1 bg-indigo-50 rounded-full">
                                        {post.userType}
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-600 ml-13 pl-1">{post.message}</p>
                        </div>
                    ))}
                {hasMore && (
                    <div ref={loader} className="text-center p-4">
                        <div className="animate-pulse flex justify-center space-x-2">
                            <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce"></div>
                            <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce delay-75"></div>
                            <div className="h-2 w-2 bg-pink-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-indigo-100 shadow-inner">
                <form onSubmit={handleSend} className="flex space-x-4">
                    <input
                        type="text"
                        placeholder={
                            user?.user?.userType === "Citizen"
                                ? "Citizens cannot post messages"
                                : "Type your message here..."
                        }
                        className="flex-1 px-6 py-4 rounded-full border-2 border-indigo-100 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-gray-700 placeholder-gray-400 bg-white shadow-sm transition-all duration-200"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={user?.user?.userType === "Citizen"}
                    />
                    <button
                        type="submit"
                        className={`px-8 py-4 rounded-full cursor-pointer flex items-center space-x-2 transition-all duration-200 shadow-md ${
                            user?.user?.userType === "Citizen"
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-700 hover:to-purple-700 text-white transform hover:scale-105"
                        }`}
                        disabled={user?.user?.userType === "Citizen"}
                    >
                        <Send className="h-5 w-5" />
                        <span className="font-medium">Send</span>
                    </button>
                </form>
                {user?.user?.userType === "Citizen" && (
                    <div className="text-center text-red-400 text-sm mt-3 bg-red-50 py-2 rounded-full">
                        Citizens are not allowed to post messages in this forum.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatWindow;