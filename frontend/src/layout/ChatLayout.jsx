import { Outlet } from 'react-router-dom'
import ChatList from '../components/chats/ChatList';

const ChatLayout = () => {
    return (
        <div className="h-screen flex">
            {/* ChatList occupies a fixed column */}
                <ChatList />

            {/* Main Content (Chat Window) */}
            <div className="flex-1 flex-col">
                <Outlet />
            </div>
        </div>
    );
};

export default ChatLayout;
