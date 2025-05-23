import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import LeasesPage from './pages/Leases';
import Units from './pages/admin/Units';
import Maintenance from './pages/Maintenance';
import LandingPage from './pages/LandingPage';
import Tenants from './pages/Tenants';
import Login from './pages/Login';
import NotFound from './components/NotFound';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main className="flex flex-row min-h-screen pt-16"> {/* pt-16 for header offset */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/leases/:id" element={<LeasesPage />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/leases" element={<LeasesPage />} />
          <Route path="/units" element={<Units />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;