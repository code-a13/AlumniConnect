import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; 
import { Menu } from 'lucide-react'; 
import logo from '../assets/logo.png'; 

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      
      {/* 1. Sidebar (Fixed Left) */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* 2. Main Content Wrapper */}
      <div style={{ 
        marginLeft: isSidebarOpen ? '290px' : '0', 
        width: isSidebarOpen ? 'calc(100% - 290px)' : '100%',
        transition: 'all 0.4s ease-in-out', // Smooth slide effect
        minHeight: '100vh'
      }}>
        
        {/* Navbar */}
        <nav style={{ 
          background: 'white', 
          padding: '0 30px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxShadow: '0 2px 15px rgba(0,0,0,0.03)',
          height: '80px',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}>
          
          {/* Left: Menu Toggle & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{ background: '#f3f4f6', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', color: '#0f284e' }}
            >
              <Menu size={24} />
            </button>
            <h2 style={{ margin: 0, color: '#0f284e', fontSize: '22px', fontWeight: 'bold' }}>Dashboard</h2>
          </div>

          {/* Right: User Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Role Badge */}
            {user && (
              <span style={{ 
                padding: '6px 14px', 
                borderRadius: '20px', 
                fontSize: '12px', 
                fontWeight: 'bold', 
                textTransform: 'uppercase',
                background: user.role === 'Student' ? '#e0f2fe' : '#fffbeb', 
                color: user.role === 'Student' ? '#0369a1' : '#92400e',
                border: `1px solid ${user.role === 'Student' ? '#bae6fd' : '#fde047'}`
              }}>
                {user.role}
              </span>
            )}
            
            <div style={{ textAlign: 'right' }}>
               <p style={{ margin: 0, color: '#888', fontSize: '12px' }}>Welcome back,</p>
               <h3 style={{ margin: 0, color: '#0f284e', fontSize: '16px' }}>{user?.name}</h3>
            </div>
            
            {/* Circular Profile Image */}
            <div style={{ padding: '2px', border: '2px solid #d4af37', borderRadius: '50%' }}>
              <img 
                src={logo} 
                alt="Profile" 
                style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </nav>

        {/* Dashboard Body - FULL WIDTH & SPACIOUS */}
        <div style={{ padding: '30px' }}>
          
          {/* Welcome Banner */}
          <div style={{ 
            background: 'linear-gradient(135deg, #0f284e 0%, #1e3a8a 100%)', 
            borderRadius: '16px', 
            padding: '40px', 
            color: 'white',
            marginBottom: '30px',
            boxShadow: '0 10px 25px rgba(15, 40, 78, 0.2)'
          }}>
            <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Hello, {user?.name}! 👋</h1>
            <p style={{ opacity: 0.9, fontSize: '16px' }}>Here is what's happening with your alumni network today.</p>
          </div>

          {/* Stats Grid - PERFECT ALIGNMENT */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Ensures cards are decent size but fill width
            gap: '30px',
            marginBottom: '40px'
          }}>
            <StatCard label="Total Mentorships" value="0" color="#0f284e" />
            <StatCard label="Active Jobs" value="12" color="#d4af37" />
            <StatCard label="Upcoming Events" value="3" color="#10b981" />
            <StatCard label="Account Status" value="Active" color="green" isText={true} />
          </div>

          {/* Recent Activity */}
          <div>
            <h3 style={{ color: '#0f284e', marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>Recent Activity</h3>
            <div style={{ 
              background: 'white', 
              padding: '60px', 
              borderRadius: '16px', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)', 
              textAlign: 'center', 
              color: '#9ca3af',
              border: '1px dashed #e5e7eb'
            }}>
              No recent activity found. Start by exploring the side menu!
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

// Reusable Card Component
const StatCard = ({ label, value, color, isText = false }) => (
  <div style={{ 
    background: 'white', 
    padding: '30px', 
    borderRadius: '16px', 
    boxShadow: '0 4px 20px rgba(0,0,0,0.04)', 
    borderLeft: `6px solid ${color}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
  >
    <p style={{ color: '#6b7280', fontSize: '13px', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      {label}
    </p>
    <h2 style={{ 
      color: isText ? color : '#0f284e', 
      fontSize: '40px', // Bigger font for numbers
      fontWeight: '800', 
      margin: 0 
    }}>
      {value}
    </h2>
  </div>
);

export default Dashboard;