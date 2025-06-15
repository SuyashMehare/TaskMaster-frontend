import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusSquare, 
  ClipboardList,
  Users,
  Settings,
  Bell,
  HelpCircle,
  Search,
  ChevronDown
} from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-700 shadow-xl">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Section - Logo & Main Nav */}
          <div className="flex items-center space-x-6">
            {/* Logo/App Name */}
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                TaskFlow
              </span>
            </div>
            
            {/* Main Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink 
                to="/dashboard" 
                icon={<LayoutDashboard size={18} />}
                text="Dashboard"
              />
              <NavLink 
                to="/create-product" 
                icon={<PlusSquare size={18} />} 
                text="Create Product"
                isActive
              />
              <NavLink 
                to="/projects" 
                icon={<ClipboardList size={18} />} 
                text="Projects"
              />
              <NavLink 
                to="/teams" 
                icon={<Users size={18} />} 
                text="Teams"
              />
            </div>
          </div>
          
          {/* Right Section - Search & User */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={18} />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Search..."
              />
            </div>
            
            {/* Icons */}
            <button className="p-1.5 rounded-full hover:bg-gray-800 text-gray-400 hover:text-gray-200 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-gray-900"></span>
            </button>
            
            <button className="p-1.5 rounded-full hover:bg-gray-800 text-gray-400 hover:text-gray-200 transition-colors">
              <HelpCircle size={20} />
            </button>
            
            <button className="p-1.5 rounded-full hover:bg-gray-800 text-gray-400 hover:text-gray-200 transition-colors">
              <Settings size={20} />
            </button>
            
            {/* User Profile */}
            <div className="flex items-center space-x-2 ml-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-medium">
                JD
              </div>
              <ChevronDown className="text-gray-400" size={18} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink Component
const NavLink = ({ to, icon, text, isActive = false }) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
      isActive 
        ? 'bg-gray-800 text-orange-400 hover:bg-gray-750'
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
    }`}
  >
    <span className="mr-2">{icon}</span>
    {text}
    {isActive && (
      <span className="ml-2 h-1.5 w-1.5 bg-green-500 rounded-full"></span>
    )}
  </Link>
);

export default Navbar;