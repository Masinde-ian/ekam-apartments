import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import LeasesPage from './pages/Leases';
import Units from './pages/admin/adminpages/Units';
import AboutUs from './pages/AboutUs';
// import Maintenance from './pages/dashpages/Maintenance';
import LandingPage from './pages/LandingPage';
// import Tenants from './pages/Tenants';
import Login from './pages/Login';
import NotFound from './components/NotFound';
import Footer from './components/Footer';

// Dashboard sub-pages
import AnnouncementsPage from './pages/dashpages/announcement';
import MaintenancePage from './pages/dashpages/maintenance';
import PaymentsPage from './pages/dashpages/payment';
import Leases from './pages/dashpages/Mylease'; // Assuming you have a Mylease page in dashboard

// Admin pages
import AdminRoute from './components/AdminRoute';
import Admin from './pages/admin/Admin';
import AdminUnits from './pages/admin/adminpages/Units';
import AdminTenants from './pages/admin/adminpages/Tenants';
import AdminPayments from './pages/admin/adminpages/Payment';
import AdminAnnouncements from './pages/admin/adminpages/Announcements';
import AdminMaintenance from './pages/admin/adminpages/Requests';
import  AdminLeases  from './pages/admin/adminpages/Leases'; // Assuming you have a Leases page in admin

function App() {
  return (
    <Router>
      <Header />
      <main className="flex flex-row min-h-screen min-w-screen content-center-safe bg-amber-50"> {/* pt-16 for header offset */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="maintenance" element={<MaintenancePage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="mylease" element={<Leases />} />
            {/* ...other nested routes */}
          </Route>
          {/* Admin routes */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route index element={<Admin />} />
            <Route path="units" element={<AdminUnits />} />
            <Route path="tenants" element={<AdminTenants />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="requests" element={<AdminMaintenance />} />
            {/* <Route path="leases" element={<AdminLeases />} /> */}
          </Route>
          <Route path="/properties" element={<Properties />} />
          {/* <Route path="/leases/:id" element={<LeasesPage />} /> */}
          <Route path="/leases" element={<LeasesPage />} />
          <Route path="/units" element={<Units />} />
          <Route path="/about" element={<AboutUs />} />
          {/* <Route path="/maintenance" element={<Maintenance />} /> */}
          {/* <Route path="/tenants" element={<Tenants />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;