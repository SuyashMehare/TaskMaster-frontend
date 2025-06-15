import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RegisterOrganization from './pages/RegisterOrganization';
import RegisterUser from './pages/RegisterUser';
import OrganizationLogin from './pages/OrganizationLogin';
import ProductPage from './pages/Product';
import Navbar from './components/common/Navbar';


function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Show navbar on all routes except auth pages */}
        <Routes>
          <Route path="/login" element={<OrganizationLogin />} />
          <Route path="/organization/register" element={<RegisterOrganization />} />
          <Route path="/user/register" element={<RegisterUser />} />
          
          {/* All other routes will show navbar */}
          <Route path="*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-product" element={<ProductPage />} />
                {/* Add other protected routes here */}
              </Routes>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;