import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Briefcase, Calendar, MessageSquare, LogOut, UserCircle, X 
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={24} />, path: '/dashboard' },
    { name: 'Mentorship', icon: <Users size={24} />, path: '/mentorship' },
    { name: 'Jobs & Internships', icon: <Briefcase size={24} />, path: '/jobs' },
    { name: 'Events', icon: <Calendar size={24} />, path: '/events' },
    { name: 'Community Chat', icon: <MessageSquare size={24} />, path: '/chat' },
    { name: 'My Profile', icon: <UserCircle size={24} />, path: '/profile' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ 
      width: '290px', // Matches the Dashboard margin
      background: '#0f284e', // Navy Blue
      color: 'white', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'fixed', 
      left: 0, 
      top: 0, 
      zIndex: 1000,
      boxShadow: isOpen ? '10px 0 25px rgba(0,0,0,0.15)' : 'none',
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
    }}>
      
      {/* 1. Header */}
      <div style={{ padding: '35px 25px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#d4af37', fontSize: '24px', fontWeight: '800', letterSpacing: '1px', margin: 0 }}>
          Alumni<span style={{ color: 'white' }}>Connect</span>
        </h2>
        <button onClick={toggleSidebar} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', opacity: 0.7 }}>
            <X size={28} />
        </button>
      </div>

      {/* 2. Menu Items */}
      <nav style={{ flex: 1, padding: '30px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div 
              key={item.name}
              onClick={() => { navigate(item.path); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '16px 25px',
                borderRadius: '12px',
                cursor: 'pointer',
                
                // Active State: Gradient Gold
                background: isActive 
                  ? 'linear-gradient(90deg, rgba(212,175,55,0.15) 0%, rgba(15,40,78,0) 100%)' 
                  : 'transparent',
                
                color: isActive ? '#d4af37' : '#b0b8c4',
                borderLeft: isActive ? '5px solid #d4af37' : '5px solid transparent',
                transition: 'all 0.3s ease',
                fontWeight: isActive ? '600' : '500',
                fontSize: '17px'
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          );
        })}
      </nav>

      {/* 3. Logout Button (FIXED: Now Gold & Clean) */}
      <div style={{ padding: '30px 25px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button 
          onClick={handleLogout} 
          style={{ 
            width: '100%', 
            padding: '16px', 
            background: 'transparent', 
            color: '#d4af37', // Gold Text
            border: '2px solid #d4af37', // Gold Border
            borderRadius: '12px', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px', 
            fontWeight: 'bold',
            fontSize: '18px',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#d4af37';
            e.currentTarget.style.color = '#0f284e';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#d4af37';
          }}
        >
          <LogOut size={22} /> Logout
        </button>
      </div>

    </div>
  );
};

export default Sidebar;