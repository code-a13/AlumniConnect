import React from 'react';
import { 
  LayoutDashboard, Users, GraduationCap, Briefcase, Calendar, LogOut, ShieldAlert, X 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ isOpen, toggleSidebar, activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={24} /> },
    { id: 'students', label: 'Students List', icon: <Users size={24} /> },
    { id: 'alumni', label: 'Alumni Directory', icon: <GraduationCap size={24} /> },
    { id: 'pending', label: 'Pending Approvals', icon: <ShieldAlert size={24} /> },
    { id: 'jobs', label: 'Manage Jobs', icon: <Briefcase size={24} /> },
    { id: 'events', label: 'Manage Events', icon: <Calendar size={24} /> },
  ];

  return (
    <div style={{ 
      width: '290px', // Fixed Width
      background: '#0f284e', 
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
      
      {/* Header */}
      <div style={{ padding: '35px 25px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#d4af37', fontSize: '24px', fontWeight: '800', letterSpacing: '1px', margin: 0 }}>
          ADMIN <span style={{ color: 'white' }}>PANEL</span>
        </h2>
        <button onClick={toggleSidebar} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', opacity: 0.7 }}>
            <X size={28} />
        </button>
      </div>

      {/* Menu */}
      <nav style={{ flex: 1, padding: '30px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <div 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '16px 25px',
                borderRadius: '12px',
                cursor: 'pointer',
                background: isActive ? 'linear-gradient(90deg, rgba(212,175,55,0.15) 0%, rgba(15,40,78,0) 100%)' : 'transparent',
                color: isActive ? '#d4af37' : '#b0b8c4',
                borderLeft: isActive ? '5px solid #d4af37' : '5px solid transparent',
                transition: 'all 0.3s ease',
                fontWeight: isActive ? '600' : '500',
                fontSize: '17px'
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '30px 25px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button 
          onClick={handleLogout} 
          style={{ 
            width: '100%', 
            padding: '16px', 
            background: 'transparent', 
            color: '#d4af37', 
            border: '2px solid #d4af37', 
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
          onMouseEnter={(e) => { e.currentTarget.style.background = '#d4af37'; e.currentTarget.style.color = '#0f284e'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#d4af37'; }}
        >
          <LogOut size={22} /> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;