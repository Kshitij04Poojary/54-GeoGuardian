import React, { useState, useEffect } from 'react';
import { AiOutlineExclamationCircle, AiOutlineCheckCircle } from 'react-icons/ai';  // Importing React Icons
import NoticeForm from '../components/forms/NoticeForm';
import { useNavigate } from 'react-router-dom';

// Utility function to format the timestamp into "X hours ago" or "X days ago"
const timeAgo = (timestamp) => {
    const now = Date.now();
    const difference = now - timestamp;  // Difference in milliseconds

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;  // Return in days
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;  // Return in hours
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;  // Return in minutes
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;  // Return in seconds
    }
};

const NoticesPage = () => {
    // Sample notices with timestamps
    const navigate = useNavigate();
    const notices = [
        { title: "Notice 1", description: "Description of Notice 1", organizationName: "Org 1", urgent: true, timestamp: Date.now() - 3600000 },  // 1 hour ago
        { title: "Notice 2", description: "Description of Notice 2", organizationName: "Org 2", urgent: false, timestamp: Date.now() - 86400000 },  // 1 day ago
        { title: "Notice 3", description: "Description of Notice 3", organizationName: "Org 3", urgent: true, timestamp: Date.now() - 60000000 }   // ~16 hours ago
    ];

    const sortedNotices = notices.sort((a, b) => (b.urgent - a.urgent));
    const handleButtonClick = () => {
        // Navigating to the desired URL
        navigate('add');  // Replace with your desired route
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-4 border-1 border-gray-200">
            <h2 className="text-2xl font-semibold text-center mb-6">Notices</h2>
            <button className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                onClick={handleButtonClick}>
                Create a Notice
            </button>

            <ul>
                {sortedNotices.map((notice, index) => (
                    <li key={index} className="my-6 p-4 border-gray-200 rounded-md py-6 bg-gray-100 border-1">
                        {/* Title, Organization, Urgency in one row */}
                        <div className="flex justify-between items-center">
                            <div className="flex flex-row gap-3 items-center">
                                <h3 className="text-xl font-semibold">{notice.title}</h3>
                                <span className="mr-4 pt-1 text-sm">by <i>{notice.organizationName}</i></span>
                            </div>

                            <div className="text-sm text-gray-500 flex items-center">
                                {/* Urgent or Normal Icon */}
                                {notice.urgent ? (
                                    <AiOutlineExclamationCircle className="h-5 w-5 text-red-500 mr-2" />
                                ) 
                                : ""
                                // (
                                    // <AiOutlineCheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                // )
                                }
                                <span
                                    className={`font-semibold ${notice.urgent ? 'text-red-500' : 'text-green-500'}`}
                                >
                                    {notice.urgent ? 'Urgent' : 'Normal'}
                                </span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-400 text-sm">Posted {timeAgo(notice.timestamp)}</p>
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <p className="text-gray-700">{notice.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoticesPage;
