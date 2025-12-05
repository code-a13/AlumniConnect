import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, ExternalLink, PlusCircle, Building, Menu } from 'lucide-react';
import logo from '../assets/logo.png'; 

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar State
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs/all');
        setJobs(res.data);
      } catch (err) { console.error(err); }
    };
    
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    
    fetchJobs();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      
      {/* 1. Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      {/* 2. Main Content Wrapper (Alignment Fix Here) */}
      <div style={{ 
        marginLeft: isSidebarOpen ? '290px' : '0', 
        width: isSidebarOpen ? 'calc(100% - 290px)' : '100%',
        transition: 'all 0.4s ease-in-out',
        minHeight: '100vh'
      }}>
        
        {/* Navbar (Copy of Dashboard Navbar for consistency) */}
        <nav style={{ 
          background: 'white', padding: '0 30px', display: 'flex', justifyContent: 'space-between', 
          alignItems: 'center', boxShadow: '0 2px 15px rgba(0,0,0,0.03)', height: '80px', 
          position: 'sticky', top: 0, zIndex: 50 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: '#f3f4f6', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', color: '#0f284e' }}>
              <Menu size={24} />
            </button>
            <h2 style={{ margin: 0, color: '#0f284e', fontSize: '22px', fontWeight: 'bold' }}>Jobs & Internships</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
             {user && (
              <span style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', background: user.role === 'Student' ? '#e0f2fe' : '#fffbeb', color: user.role === 'Student' ? '#0369a1' : '#92400e', border: `1px solid ${user.role === 'Student' ? '#bae6fd' : '#fde047'}` }}>
                {user.role}
              </span>
            )}
            <img src={logo} alt="Profile" style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid #d4af37', padding: '2px' }} />
          </div>
        </nav>

        {/* Page Content */}
        <div style={{ padding: '40px', maxWidth: '1600px', margin: '0 auto' }}>
          
          {/* Header Action Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <div>
              <h1 style={{ color: '#0f284e', margin: 0, fontSize: '28px', fontWeight: 'bold' }}>Explore Opportunities</h1>
              <p style={{ color: '#666', marginTop: '5px' }}>Find your next career move posted by alumni.</p>
            </div>
            
            {user?.role === 'Alumni' && (
              <button 
                onClick={() => navigate('/post-job')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 25px', background: '#d4af37', color: '#0f284e', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(212, 175, 55, 0.3)', transition: 'transform 0.2s' }}
              >
                <PlusCircle size={20} /> Post a Job
              </button>
            )}
          </div>

          {/* Jobs Grid */}
          {jobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px', border: '1px dashed #ddd' }}>
              <Briefcase size={40} color="#ccc" style={{ marginBottom: '15px' }} />
              <p style={{ color: '#999', fontSize: '18px' }}>No jobs posted yet.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
              {jobs.map((job) => (
                <div key={job._id} style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', borderTop: '5px solid #0f284e', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                      <div style={{ width: '50px', height: '50px', background: '#f8f9fa', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #eee' }}>
                        <Building size={24} color="#0f284e" />
                      </div>
                      <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0369a1', padding: '5px 12px', borderRadius: '20px', fontWeight: '600' }}>
                        {new Date(job.postedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 style={{ margin: 0, color: '#333', fontSize: '20px', fontWeight: 'bold' }}>{job.title}</h3>
                    <p style={{ margin: '5px 0 15px', color: '#666', fontWeight: '500', fontSize: '15px' }}>{job.company}</p>
                    
                    <div style={{ display: 'flex', gap: '15px', color: '#888', fontSize: '14px', marginBottom: '20px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={16} /> {job.location.toUpperCase()}</span>
                    </div>

                    <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {job.description}
                    </p>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '25px' }}>
                      {job.skills.split(',').slice(0,3).map((skill, index) => (
                        <span key={index} style={{ fontSize: '12px', background: '#f3f4f6', padding: '5px 10px', borderRadius: '6px', color: '#555', fontWeight: '500', border: '1px solid #eee' }}>
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a 
                    href={job.applyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ display: 'block', textAlign: 'center', background: '#0f284e', color: 'white', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', transition: 'background 0.3s', boxShadow: '0 4px 10px rgba(15, 40, 78, 0.2)' }}
                  >
                    Apply Now <ExternalLink size={16} style={{ marginBottom: '-3px', marginLeft: '5px' }} />
                  </a>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Jobs;