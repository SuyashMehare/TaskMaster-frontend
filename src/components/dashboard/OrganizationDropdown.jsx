import { useEffect, useState } from "react";
import { X, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { fetchSelectedOrganization } from "../../redux/slices/organizationSlice";

export default function OrganizationDropdown() {
  const dispatch = useDispatch();
  const { _id, name } = useSelector(state => state.organization);
  const nonSelectedOpt = useSelector(state => state.user.organizations);
  const [isOpen, setIsOpen] = useState(false);
  const [organizationsOptions, setOrganizationsOptions] = useState([]);
  const [activeCategory , setActiveCategory ] = useState('ownedOrganizations');

  const organizationTypes = [
    { key: 'ownedOrganizations', label: 'Owned' },
    { key: 'clientOrganizations', label: 'Clients' },
    { key: 'activeOrganizations', label: 'Active' }
  ];

  const handleOrganizationClick = (orgType) => {
    if (orgType === "ownedOrganizations")
      setOrganizationsOptions(nonSelectedOpt.ownedOrganizations);
    if (orgType === "clientOrganizations")
      setOrganizationsOptions(nonSelectedOpt.clientOrganizations);
    if (orgType === "activeOrganizations")
      setOrganizationsOptions(nonSelectedOpt.activeOrganizations);

    setActiveCategory(orgType)
  };

  const selectOrganization = (organizationId) => {
    dispatch(fetchSelectedOrganization(organizationId));
  }


  return (
    <div className="relative">
      {/* Organization name button - Dark with hover glow */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all shadow-md hover:shadow-lg hover:ring-1 hover:ring-gray-500"
      >
        <span className="text-sm font-medium text-white truncate max-w-[160px]">
          {name}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Panel - Dark theme with colored categories */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="relative bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md p-6">
            {/* Close button with hover effect */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>

            {/* Tabs with colored categories */}
            <div className="flex gap-2 mb-6 border-b border-gray-700 pb-2">
              <button
                onClick={() => handleOrganizationClick('ownedOrganizations')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                  ${activeCategory === 'ownedOrganizations'
                    ? 'bg-orange-500/90 text-white'
                    : 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'}`}
              >
                Owned
              </button>
              <button
                onClick={() => handleOrganizationClick('activeOrganizations')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                  ${activeCategory === 'activeOrganizations'
                    ? 'bg-emerald-500/90 text-white'
                    : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'}`}
              >
                Active
              </button>
              <button
                onClick={() => handleOrganizationClick('clientOrganizations')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                  ${activeCategory === 'clientOrganizations'
                    ? 'bg-blue-500/90 text-white'
                    : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'}`}
              >
                Clients
              </button>
            </div>

            {/* Organization list - Dark with hover effects */}
            <div className="max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {organizationsOptions.map((org) => (
                <div
                  key={org.organizationId}
                  onClick={() => {
                    selectOrganization(org.organizationId);
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 mb-1 hover:bg-gray-700/50 active:bg-gray-600 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-600"
                >
                  <div className="font-medium text-white">{org.organizationName}</div>
                  <div className="text-xs mt-1 flex gap-2">
                    <span className={`px-2 py-0.5 rounded-full ${org.type === 'owned' ? 'bg-orange-500/20 text-orange-300' :
                        org.type === 'active' ? 'bg-emerald-500/20 text-emerald-300' :
                          'bg-blue-500/20 text-blue-300'
                      }`}>
                      {org.type}
                    </span>
                    {org.members && (
                      <span className="text-gray-400">👥 {org.members}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

}


/**
 * Current org from 
 * Other options from 
 */