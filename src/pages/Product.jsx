import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, saveProduct } from '../redux/slices/product/productSlice';

function findOrganizationUserId(organizations, targetOrganizationId) {
    // Flatten all organization arrays and search
    return Object.values(organizations)
        .flat()
        .find(org => org.organizationId === targetOrganizationId)
        ?.organizationUserId; // Correct property name
}


export default function ProductPage() {
    const dispatch = useDispatch();
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        expectedOutcome: '',
        label: '',
        sprint: 1,
        sprintDuration: 2,
        startDate: '',
        endDate: '',
        stories: [],
        epics: [],
    });

    const organizationId = useSelector(state => state.organization._id)
    const userOrganizations = useSelector(state => state.user.organization);
    const organizationUserId = findOrganizationUserId(userOrganizations, organizationId)
    const organizationProducts = useSelector(state => state.product)


    const [newStory, setNewStory] = useState({ name: '', status: 'planned', points: 0 });
    const [newEpic, setNewEpic] = useState({ name: '', status: 'planned' });
    const [activeTab, setActiveTab] = useState('details');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProduct(organizationProducts.buildProduct));
    };

    const addStory = (e) => {
        e.preventDefault();
        if (newStory.name.trim()) {
            setProductData(prev => ({
                ...prev,
                stories: [...prev.stories, { ...newStory, id: `story_${Date.now()}` }]
            }));
            setNewStory({ name: '', status: 'planned', points: 0 });
        }
    };

    const addEpic = (e) => {
        e.preventDefault();
        if (newEpic.name.trim()) {
            setProductData(prev => ({
                ...prev,
                epics: [...prev.epics, { ...newEpic, id: `epic_${Date.now()}` }]
            }));
            setNewEpic({ name: '', status: 'planned' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-purple-400">Product Management</h1>

                {/* Navigation Tabs */}
                <div className="flex border-b border-gray-700 mb-6">
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`px-4 py-2 font-medium ${activeTab === 'details' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
                    >
                        Product Details
                    </button>
                    <button
                        onClick={() => setActiveTab('stories')}
                        className={`px-4 py-2 font-medium ${activeTab === 'stories' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
                    >
                        User Stories
                    </button>
                    <button
                        onClick={() => setActiveTab('epics')}
                        className={`px-4 py-2 font-medium ${activeTab === 'epics' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
                    >
                        Epics
                    </button>
                </div>

                {/* Product Details Tab */}
                {activeTab === 'details' && (
                    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={productData.name}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                    placeholder="Enter product name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Product Label/ID</label>
                                <input
                                    type="text"
                                    name="label"
                                    value={productData.label}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                    placeholder="Enter short product identifier"
                                    maxLength="20"
                                />
                                <p className="mt-1 text-xs text-gray-400">Short, memorable identifier for this product</p>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={productData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                    placeholder="Describe the product..."
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-1">Expected Outcome</label>
                                <textarea
                                    name="expectedOutcome"
                                    value={productData.expectedOutcome}
                                    onChange={handleChange}
                                    rows="2"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                    placeholder="What are the expected outcomes?"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Sprint Number</label>
                                <input
                                    type="number"
                                    name="sprint"
                                    value={productData.sprint}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Sprint Duration (weeks)</label>
                                <input
                                    type="number"
                                    name="sprintDuration"
                                    value={productData.sprintDuration}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={productData.startDate}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={productData.endDate}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-4">
                            {/* Save Temporarily Button */}
                            <button
                                type="button"
                                onClick={() => {
                                    // This saves to local state/Redux without submitting
                                    dispatch(saveProduct({ ...productData, ['organizationId']: organizationId, ['handleBy']: organizationUserId }));
                                    alert('Product details saved temporarily');
                                }}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                Save Temporarily
                            </button>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                Submit Product
                            </button>
                        </div>
                    </form>
                )}

                {/* User Stories Tab */}
                {activeTab === 'stories' && (
                    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">User Stories</h2>

                        {/* Add Story Form */}
                        <form onSubmit={addStory} className="mb-6 p-4 bg-gray-700 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Story Name</label>
                                    <input
                                        type="text"
                                        value={newStory.name}
                                        onChange={(e) => setNewStory({ ...newStory, name: e.target.value })}
                                        className="w-full bg-gray-600 border border-gray-500 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                        placeholder="Enter story name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                                    <select
                                        value={newStory.status}
                                        onChange={(e) => setNewStory({ ...newStory, status: e.target.value })}
                                        className="w-full bg-gray-600 border border-gray-500 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                    >
                                        <option value="planned">Planned</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Story Points</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={newStory.points}
                                        onChange={(e) => setNewStory({ ...newStory, points: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-gray-600 border border-gray-500 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
                            >
                                Add Story
                            </button>
                        </form>

                        {/* Stories List */}
                        <div className="space-y-3">
                            {productData.stories.length > 0 ? (
                                productData.stories.map((story) => (
                                    <div key={story.id} className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-200 border-l-4 border-purple-500">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-medium">{story.name}</h3>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 text-xs rounded-full ${story.status === 'completed' ? 'bg-green-900 text-green-300' :
                                                    story.status === 'in-progress' ? 'bg-yellow-900 text-yellow-300' :
                                                        'bg-blue-900 text-blue-300'
                                                    }`}>
                                                    {story.status}
                                                </span>
                                                <span className="px-2 py-1 text-xs bg-purple-900 text-purple-300 rounded-full">
                                                    {story.points} pts
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-400">
                                    No stories added yet
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Epics Tab */}
                {activeTab === 'epics' && (
                    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Epics</h2>

                        {/* Add Epic Form */}
                        <form onSubmit={addEpic} className="mb-6 p-4 bg-gray-700 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Epic Name</label>
                                    <input
                                        type="text"
                                        value={newEpic.name}
                                        onChange={(e) => setNewEpic({ ...newEpic, name: e.target.value })}
                                        className="w-full bg-gray-600 border border-gray-500 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                        placeholder="Enter epic name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                                    <select
                                        value={newEpic.status}
                                        onChange={(e) => setNewEpic({ ...newEpic, status: e.target.value })}
                                        className="w-full bg-gray-600 border border-gray-500 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                    >
                                        <option value="planned">Planned</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
                            >
                                Add Epic
                            </button>
                        </form>

                        {/* Epics List */}
                        <div className="space-y-3">
                            {productData.epics.length > 0 ? (
                                productData.epics.map((epic) => (
                                    <div key={epic.id} className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-200 border-l-4 border-blue-500">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-medium">{epic.name}</h3>
                                            <span className={`px-2 py-1 text-xs rounded-full ${epic.status === 'completed' ? 'bg-green-900 text-green-300' :
                                                epic.status === 'in-progress' ? 'bg-yellow-900 text-yellow-300' :
                                                    'bg-blue-900 text-blue-300'
                                                }`}>
                                                {epic.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-400">
                                    No epics added yet
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};