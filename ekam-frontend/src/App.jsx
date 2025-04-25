import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import LeasesPage from './pages/Leases';
import Maintenance from './pages/Maintenance';
import LandingPage from './pages/LandingPage';
import Tenants from './pages/Tenants';
import Login from './pages/Login';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Header>
        <div className="flex flex-row">
          <Routes className="flex-grow">
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/leases/:id" element={<LeasesPage />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Header>
    </Router>
  );
}

export default App;