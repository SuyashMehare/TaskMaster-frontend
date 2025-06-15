import React, { useState } from 'react';

export default function () {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        email: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    function validateForm() {
        let isValid = true;
        const newErrors = { ...errors };

        if (!formData.name.trim()) {
            newErrors.name = 'Organization name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if (validateForm()) {
            const response = await axios.post(
                'http://localhost:5000/api/v1/organisations/register',
                formData,
                {
                    headers: { 'Content-Type': 'application/json' }
                });

            setFormData({
                name: '',
                description: '',
                email: ''
            });

            console.log('Organization registration submitted:', formData);
            alert('Organization registration successful!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Register Organization</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Organization Name Field */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                                Organization Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={`w-full px-3 py-2 bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Enter organization name"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                                Contact Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={`w-full px-3 py-2 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Enter contact email"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                        </div>

                        {/* Description Field */}
                        <div className="mb-6">
                            <label htmlFor="description" className="block text-gray-300 text-sm font-medium mb-2">
                                Description (Optional)
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Brief description about your organization"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                        >
                            Register Organization
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-6 text-center text-gray-400 text-sm">
                        <p>Already have an organization? <a href="#" className="text-blue-400 hover:text-blue-300">Manage existing</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};
