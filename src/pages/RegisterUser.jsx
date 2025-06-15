import axios from 'axios';
import React, { useState } from 'react';

export default function () {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        timezone: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        timezone: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    function validateForm() {
        let isValid = true;
        const newErrors = { ...errors };

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
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

        try {
            if (validateForm()) {

                const response = await axios.post(
                    'http://localhost:5000/api/v1/users/register', 
                    formData, 
                    { headers: { 'Content-Type': 'application/json'} 
                });
                setFormData({
                    username: '',
                    email: '',
                    timezone: ''
                });

                console.log('User registerd', data);

                alert('Registration successful!');
            }
        } catch (error) {
            console.log('Error while submiting the form', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Username Field */}
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-2">
                                Username <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className={`w-full px-3 py-2 bg-gray-700 border ${errors.username ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Enter your username"
                            />
                            {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={`w-full px-3 py-2 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                        </div>

                        {/* Timezone Field */}
                        <div className="mb-6">
                            <label htmlFor="timezone" className="block text-gray-300 text-sm font-medium mb-2">
                                Timezone <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="timezone"
                                name="timezone"
                                value={formData.timezone}
                                onChange={handleChange}
                                required
                                className={`w-full px-3 py-2 bg-gray-700 border ${errors.timezone ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                                <option value="">Select your timezone</option>
                                <option value="Asia/Kolkata">India (IST, UTC+5:30)</option>
                                <option value="America/New_York">Eastern Time (ET, UTC-5:00)</option>
                                <option value="Europe/London">London (GMT, UTC+0:00)</option>
                                <option value="Asia/Dubai">Dubai (GST, UTC+4:00)</option>
                                <option value="Australia/Sydney">Sydney (AEST, UTC+10:00)</option>
                            </select>
                            {errors.timezone && <p className="mt-1 text-sm text-red-400">{errors.timezone}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                        >
                            Register
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-6 text-center text-gray-400 text-sm">
                        <p>Already have an account? <a href="#" className="text-blue-400 hover:text-blue-300">Sign in</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};
