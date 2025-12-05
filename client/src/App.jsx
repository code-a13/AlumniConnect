import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import All Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard'; 
import PrivateRoute from './components/PrivateRoute';
import Jobs from './pages/Jobs';
import PostJob from './pages/PostJob';
import Profile from './pages/Profile'; 
import Home from './pages/Home';
import Mentorship from './pages/Mentorship'; // 1. IMPORT REAL PAGE

function App() {
  return (
    <div>
      <Toaster position="top-center" />
      
      <Routes>
        
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* --- PROTECTED ROUTES (Requires Login) --- */}
        
        {/* 1. Student/Alumni Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />

        {/* 2. Admin Panel */}
        <Route 
          path="/admin-dashboard" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />

        {/* 3. Jobs Module */}
        <Route 
          path="/jobs" 
          element={
            <PrivateRoute>
              <Jobs />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/post-job" 
          element={
            <PrivateRoute>
              <PostJob />
            </PrivateRoute>
          } 
        />

        {/* 4. Profile Module */}
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />

        {/* 5. Mentorship Module (REAL PAGE NOW) */}
        <Route 
          path="/mentorship" 
          element={
            <PrivateRoute>
              <Mentorship />
            </PrivateRoute>
          } 
        />

      </Routes>
    </div>
  );
}

export default App;