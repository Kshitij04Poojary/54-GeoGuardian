import React, { useState } from 'react';

const NoticeForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        organizationName: '',
        urgent: false,
    });
    
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        organizationName: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = { title: '', description: '', organizationName: '' };
        let isValid = true;

        // Validation logic
        if (formData.title.length < 5) {
            newErrors.title = 'Title must be at least 5 characters long';
            isValid = false;
        }

        if (formData.description.length < 10) {
            newErrors.description = 'Description must be at least 10 characters long';
            isValid = false;
        }

        if (!formData.organizationName) {
            newErrors.organizationName = 'Organization name is required';
            isValid = false;
        }

        setErrors(newErrors);

        // If form is valid, send data to the backend
        if (isValid) {
            alert('Form submitted successfully!');
            // Example of API call
            /*
            fetch('/api/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
            */
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-xl mt-6 border-1 border-gray-200">
            <h2 className="text-2xl font-semibold text-center mb-6">Display a notice</h2>
            <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.title && <div className="text-red-500 text-sm mt-2">{errors.title}</div>}
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.description && <div className="text-red-500 text-sm mt-2">{errors.description}</div>}
                </div>

                {/* Organization Name */}
                <div className="mb-4">
                    <label htmlFor="organizationName" className="block font-medium text-gray-700">Organization Name</label>
                    <input
                        type="text"
                        id="organizationName"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleChange}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.organizationName && <div className="text-red-500 text-sm mt-2">{errors.organizationName}</div>}
                </div>

                {/* Urgent Checkbox */}
                <div className="mb-4">
                    <label htmlFor="urgent" className="inline-flex items-center font-medium text-gray-700">
                        <input
                            type="checkbox"
                            id="urgent"
                            name="urgent"
                            checked={formData.urgent}
                            onChange={handleChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Urgent</span>
                    </label>
                </div>

                <button type="submit" className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Post
                </button>
            </form>
        </div>
    );
};

export default NoticeForm;
