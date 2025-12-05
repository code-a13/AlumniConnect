import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, Calendar, ArrowRight, ShieldCheck, GraduationCap, ChevronRight } from 'lucide-react';
// IMPORTANT: Ensure logo.png is in client/src/assets/ folder
import logo from '../assets/logo.png'; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#ffffff', color: '#333' }}>
      
      {/* 1. Glassmorphism Navbar (Sticky & Clean) */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '15px 6%', 
        background: 'rgba(255, 255, 255, 0.9)', 
        backdropFilter: 'blur(15px)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid rgba(0,0,0,0.03)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src={logo} alt="AlumniConnect" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
          <h2 style={{ margin: 0, color: '#0f284e', fontWeight: '800', fontSize: '24px', letterSpacing: '-0.5px' }}>
            Alumni<span style={{ color: '#d4af37' }}>Connect</span>
          </h2>
        </div>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button 
            onClick={() => navigate('/login')} 
            style={{ 
              padding: '12px 30px', background: 'transparent', color: '#0f284e', 
              fontWeight: '700', fontSize: '16px', border: 'none', 
              cursor: 'pointer', transition: 'color 0.3s' 
            }}
            onMouseEnter={(e) => e.target.style.color = '#d4af37'}
            onMouseLeave={(e) => e.target.style.color = '#0f284e'}
          >
            Login
          </button>
          <button 
            onClick={() => navigate('/register')} 
            style={{ 
              padding: '12px 30px', background: '#0f284e', border: 'none', 
              color: 'white', borderRadius: '50px', fontWeight: 'bold', 
              cursor: 'pointer', boxShadow: '0 8px 20px rgba(15, 40, 78, 0.25)', 
              transition: 'all 0.3s', fontSize: '16px' 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 25px rgba(15, 40, 78, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(15, 40, 78, 0.25)';
            }}
          >
            Join Network
          </button>
        </div>
      </nav>

      {/* 2. Massive Hero Section */}
      <header style={{ 
        textAlign: 'center', 
        padding: '120px 20px 140px', 
        background: 'radial-gradient(circle at 50% 50%, #fcfcfc 0%, #f1f5f9 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Background Elements */}
        <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: '600px', height: '600px', background: 'rgba(212,175,55,0.05)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '500px', height: '500px', background: 'rgba(15,40,78,0.05)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }}></div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ 
            display: 'inline-block', padding: '10px 20px', background: '#e0f2fe', color: '#0369a1', 
            borderRadius: '30px', fontSize: '14px', fontWeight: '800', marginBottom: '35px', 
            letterSpacing: '1px', textTransform: 'uppercase', boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
          }}>
            🎓 The Official Alumni Portal
          </div>
          
          {/* BIGGER HEADER TEXT */}
          <h1 style={{ 
            fontSize: '72px', 
            color: '#0f284e', 
            marginBottom: '30px', 
            lineHeight: '1.1', 
            fontWeight: '900', 
            letterSpacing: '-2px' 
          }}>
            Your Network is your <br/> 
            <span style={{ 
              background: 'linear-gradient(90deg, #d4af37 0%, #b4860b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'underline', 
              textDecorationColor: 'rgba(212, 175, 55, 0.3)', 
              textDecorationThickness: '6px' 
            }}>
              Net Worth.
            </span>
          </h1>
          
          <p style={{ 
            fontSize: '22px', 
            color: '#555', 
            marginBottom: '60px', 
            maxWidth: '750px', 
            margin: '0 auto 60px', 
            lineHeight: '1.6',
            fontWeight: '400'
          }}>
            Reconnect with seniors, mentor juniors, find exclusive job opportunities, and build a lasting legacy with your institution.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px' }}>
            <button 
              onClick={() => navigate('/register')} 
              style={{ 
                padding: '20px 50px', fontSize: '18px', background: '#d4af37', 
                color: '#0f284e', border: 'none', borderRadius: '15px', 
                fontWeight: 'bold', cursor: 'pointer', display: 'flex', 
                alignItems: 'center', gap: '12px', transition: 'all 0.3s', 
                boxShadow: '0 15px 30px rgba(212, 175, 55, 0.3)' 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(212, 175, 55, 0.3)';
              }}
            >
              Get Started Now <ArrowRight size={24} />
            </button>
            <button 
              onClick={() => navigate('/login')}
              style={{ 
                padding: '20px 45px', fontSize: '18px', background: 'white', 
                color: '#0f284e', border: '2px solid #e5e7eb', borderRadius: '15px', 
                fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' 
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.borderColor = '#0f284e'; 
                e.currentTarget.style.background = '#f8f9fa';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.borderColor = '#e5e7eb'; 
                e.currentTarget.style.background = 'white';
              }}
            >
              Member Login
            </button>
          </div>
        </div>
      </header>

      {/* 3. Stats Section (Floating Bar) */}
      <div style={{ maxWidth: '1200px', margin: '-70px auto 0', position: 'relative', zIndex: 10, padding: '0 20px' }}>
        <div style={{ 
          background: '#0f284e', padding: '50px', borderRadius: '24px', 
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          textAlign: 'center', color: 'white', boxShadow: '0 20px 50px rgba(15, 40, 78, 0.3)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '56px', fontWeight: 'bold', margin: 0, color: '#d4af37' }}>5000+</h2>
            <p style={{ margin: '10px 0 0', opacity: 0.8, fontSize: '16px', letterSpacing: '2px', fontWeight: '600' }}>ALUMNI CONNECTED</p>
          </div>
          <div style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '56px', fontWeight: 'bold', margin: 0, color: '#d4af37' }}>120+</h2>
            <p style={{ margin: '10px 0 0', opacity: 0.8, fontSize: '16px', letterSpacing: '2px', fontWeight: '600' }}>TOP COMPANIES</p>
          </div>
          <div>
            <h2 style={{ fontSize: '56px', fontWeight: 'bold', margin: 0, color: '#d4af37' }}>50+</h2>
            <p style={{ margin: '10px 0 0', opacity: 0.8, fontSize: '16px', letterSpacing: '2px', fontWeight: '600' }}>YEARLY EVENTS</p>
          </div>
        </div>
      </div>

      {/* 4. Features Grid - Clean & Spacious */}
      <section style={{ padding: '140px 20px', background: '#ffffff' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '42px', color: '#0f284e', fontWeight: '900', marginBottom: '15px' }}>Why Join AlumniConnect?</h2>
            <p style={{ fontSize: '20px', color: '#666', maxWidth: '700px', margin: '0 auto' }}>Unlock the power of your institution's global network with tools designed for your growth.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            <FeatureCard 
              icon={<Briefcase size={40} />} 
              title="Exclusive Job Portal" 
              desc="Access high-paying jobs and internships posted directly by alumni working in top MNCs like Google and Zoho." 
            />
            <FeatureCard 
              icon={<Users size={40} />} 
              title="1-on-1 Mentorship" 
              desc="Book private sessions with seniors for career guidance, resume reviews, and mock interviews to crack your dream job." 
            />
            <FeatureCard 
              icon={<Calendar size={40} />} 
              title="Reunions & Events" 
              desc="Never miss a college event. RSVP for tech talks, workshops, and alumni meetups happening near you." 
            />
          </div>
        </div>
      </section>

      {/* 5. Footer - Minimalist */}
      <footer style={{ padding: '80px 20px', background: '#0b1e3b', color: 'white', textAlign: 'center', borderTop: '6px solid #d4af37' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
          <div style={{ background: 'white', borderRadius: '50%', padding: '8px', boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}>
             <img src={logo} alt="Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
          </div>
          <h3 style={{ margin: 0, color: 'white', fontSize: '28px', fontWeight: 'bold' }}>AlumniConnect</h3>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', marginBottom: '30px' }}>&copy; 2025 AlumniConnect. Designed for Excellence.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', fontSize: '16px', color: '#d4af37', fontWeight: 'bold' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color='white'} onMouseLeave={(e)=>e.target.style.color='#d4af37'}>Privacy Policy</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color='white'} onMouseLeave={(e)=>e.target.style.color='#d4af37'}>Terms of Service</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color='white'} onMouseLeave={(e)=>e.target.style.color='#d4af37'}>Contact Support</span>
        </div>
      </footer>

    </div>
  );
};

// Polished Feature Card Component
const FeatureCard = ({ icon, title, desc }) => (
  <div style={{ 
    background: 'white', 
    padding: '50px 40px', 
    borderRadius: '24px', 
    boxShadow: '0 10px 40px rgba(0,0,0,0.04)', 
    transition: 'all 0.4s ease',
    cursor: 'default',
    border: '1px solid #f0f0f0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-15px)';
    e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.08)';
    e.currentTarget.style.borderColor = '#d4af37';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.04)';
    e.currentTarget.style.borderColor = '#f0f0f0';
  }}
  >
    <div style={{ 
      width: '80px', height: '80px', background: '#f0f4ff', borderRadius: '20px', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px', color: '#0f284e' 
    }}>
      {icon}
    </div>
    <h3 style={{ margin: '0 0 20px', color: '#0f284e', fontSize: '26px', fontWeight: '800' }}>{title}</h3>
    <p style={{ color: '#666', lineHeight: '1.8', fontSize: '16px', margin: 0 }}>{desc}</p>
    <div style={{ marginTop: 'auto', paddingTop: '30px', display: 'flex', alignItems: 'center', gap: '8px', color: '#d4af37', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
      Learn more <ChevronRight size={18} />
    </div>
  </div>
);

export default Home;