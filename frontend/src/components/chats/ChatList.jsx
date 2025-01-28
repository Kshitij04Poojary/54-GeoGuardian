import React from 'react'
import { useLocation, Link } from 'react-router-dom';
// import { clients } from '../../constants';

const ChatList = () => {

  const location = useLocation();

  return (
    <div className="w-1/4 h-screen relative flex flex-col bg-white pt-4 border-r">
      {/* Search Bar */}
      <div className="mb-4 px-4">
        <div className='flex items-center space-x-2 mb-3'>
          <h1 className='text-2xl font-bold'>Chats</h1>
          <div className='bg-blue-100 h-4 px-2 py-1 rounded-full text-blue-400 text-xs flex justify-center items-center'>29</div>
        </div>
        <input
          type="text"
          placeholder="What are you looking?"
          className="w-full px-4 py-1.5 border rounded-full focus:outline-none"
        />
      </div>

      {/* Tabs
      {isNormalDashboard && (
        <div className="flex justify-start space-x-2 px-4 items-start mb-3">
          <div className="px-4 py-1 rounded-full cursor-pointer bg-[#3182ce] hover:bg-[#2B6CB0] text-sm text-white">
            <Link to="/dashboards/home"
              className={({ isActive }) => (isActive ? 'bg-[#3182ce] text-white' : 'bg-white')} >
              Chats
            </Link>
          </div>
          <div className="px-4 py-1 rounded-full cursor-pointer bg-[#3182ce] hover:bg-[#2B6CB0] text-sm text-white">
            <Link
              to="/dashboards/details"
              className={({ isActive }) => (isActive ? 'bg-[#3182ce] text-white' : 'bg-white')}
            >
              Details
            </Link>
          </div>
        </div>
      )} */}

      {/* Chat List */}
      {/* <div className='overflow-y-scroll scrollbar-none scrollbar-thumb-blue-500 scrollbar-track-gray-100 border-t'>
        <ul className="space-y-0">
          {clients.map((client) => (
            <li key={client.id} className="flex items-center hover:bg-[#EEF2FE] px-3 py-4 border-b space-x-4 cursor-pointer">
              <img
                src={client.avatar}
                className="w-10 h-10 rounded-full object-cover object-center"
                alt={`${client.name} Avatar`}
              />
              <div>
                <div className="font-bold">{client.name}</div>
                <div className="text-sm text-custom-gray">{client.message}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='absolute bottom-5 right-5 flex justify-center items-center'>
        <Link to="/dashboards/add-client">
          <button className='w-10 h-10 text-white bg-[#3182CE] text-2xl text-center rounded-full'>+</button>
        </Link>
      </div> */}
    </div>
  )
}

export default ChatList