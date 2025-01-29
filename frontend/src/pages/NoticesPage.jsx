import React, { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

// Utility function to format timestamps
const timeAgo = (timestamp) => {
    const now = Date.now();
    const difference = now - timestamp;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
};

const NoticesPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        organizationName: '',
        urgent: false
    });

    const notices = [
        { title: "Notice 1", description: "Description of Notice 1", organizationName: "Org 1", urgent: true, timestamp: Date.now() - 3600000 },
        { title: "Notice 2", description: "Description of Notice 2", organizationName: "Org 2", urgent: false, timestamp: Date.now() - 86400000 },
        { title: "Notice 3", description: "Description of Notice 3", organizationName: "Org 3", urgent: true, timestamp: Date.now() - 60000000 }
    ];

    const sortedNotices = notices.sort((a, b) => b.urgent - a.urgent || b.timestamp - a.timestamp);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setIsFormOpen(false);
        setFormData({
            title: '',
            description: '',
            organizationName: '',
            urgent: false
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <>
            <div className="p-6 bg-gradient-to-r from-indigo-400 to-purple-400 shadow-lg flex items-center space-x-3">
                <h2 className="text-xl font-bold text-white">Notices</h2>
            </div>
            <button
                className="absolute bottom-4 right-4 bg-blue-500 text-white text-2xl flex justify-center items-center w-12 h-12 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out shadow-md hover:shadow-lg z-10"
                onClick={() => setIsFormOpen(true)}
            >
                +
            </button>
            <div className="bg-[#F4F2FD] p-4 relative">
                {isFormOpen && (
                    <>
                        <div className="fixed inset-0 filter blur-sm backdrop-blur-sm z-40" />

                        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 border-gray-500">
                            <div className="bg-white rounded-lg p-6 w-full shadow-2xl max-w-md relative">
                                <button
                                    onClick={() => setIsFormOpen(false)}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <h3 className="text-2xl font-semibold mb-8 text-center">Create New Notice</h3>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Organization Name
                                        </label>
                                        <input
                                            type="text"
                                            name="organizationName"
                                            value={formData.organizationName}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-32"
                                            required
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="urgent"
                                            checked={formData.urgent}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 block text-sm text-gray-700">
                                            Mark as Urgent
                                        </label>
                                    </div>

                                    <button
                                        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                    >
                                        Create Notice
                                    </button>
                                </form>
                            </div>
                        </div>
                    </>
                )}

                <ul>
                    {sortedNotices.map((notice, index) => (
                        <li key={index} className="my-4 p-4 border-gray-200 rounded-xl py-6 bg-white border-1">
                            <div className="flex justify-between items-center">
                                <div className="flex flex-row gap-3 items-center">
                                    <h3 className="text-xl font-semibold">{notice.title}</h3>
                                    <span className="mr-4 pt-1 text-sm">by <i>{notice.organizationName}</i></span>
                                </div>

                                <div className="text-sm text-gray-500 flex items-center">
                                    {notice.urgent && (
                                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                                    )}
                                    <span className={`font-semibold ${notice.urgent ? 'text-red-500' : 'text-green-500'}`}>
                                        {notice.urgent ? 'Urgent' : 'Normal'}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-gray-400 text-sm">Posted {timeAgo(notice.timestamp)}</p>
                            </div>

                            <div className="mb-4">
                                <p className="text-gray-700">{notice.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default NoticesPage;
