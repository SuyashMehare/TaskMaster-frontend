import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RegisterOrganization from './pages/RegisterOrganization';
import RegisterUser from './pages/RegisterUser';
import OrganizationLogin from './pages/OrganizationLogin';

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/login" element={<OrganizationLogin/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/organization/register" element={<RegisterOrganization/>} />
          <Route path="/user/register" element={<RegisterUser/>} />
        </Routes>
      </Router>

  );
}

export default App;