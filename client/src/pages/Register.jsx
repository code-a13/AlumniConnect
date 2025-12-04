import React, { useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
// FIX: Added 'Calendar' to the imports list below
import { Mail, Lock, User, Briefcase, GraduationCap, Building, Hash, Calendar } from 'lucide-react';
import logo from '../assets/logo.png'; 

const Register = () => {
  // State for all fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student', // Default
    department: 'CSE', // Default
    batch: '',
    rollNumber: '',
    currentCompany: '',
    jobRole: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/register', formData);
      toast.success(res.data.message);
      
      // Delay navigation slightly so user sees the success message
      setTimeout(() => { 
        navigate('/login'); 
        setLoading(false);
      }, 2000);

    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.response?.data?.message || 'Registration Failed');
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper" style={{ padding: '40px 0', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
      <div className="login-container" style={{ 
        borderTop: `5px solid ${formData.role === 'Student' ? '#0f284e' : '#d4af37'}`, 
        maxWidth: '500px',
        width: '100%'
      }}>
        
        <div className="logo-section">
          <img src={logo} alt="Logo" className="logo-img" style={{ width: '80px', marginBottom: '10px' }} />
          <h2 className="brand-title">Create Account</h2>
          <p className="brand-subtitle">Join the Alumni Network</p>
        </div>

        <form onSubmit={handleRegister} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* 1. Role Selection Toggles */}
          <div className="form-group">
            <label style={{ fontSize: '14px', color: '#666', marginBottom: '8px', display: 'block' }}>I am a...</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="button" 
                onClick={() => setFormData({...formData, role: 'Student'})}
                style={{ 
                  flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #0f284e', 
                  background: formData.role === 'Student' ? '#0f284e' : 'white', 
                  color: formData.role === 'Student' ? 'white' : '#0f284e', cursor: 'pointer', fontWeight: 'bold' 
                }}
              >Student</button>
              <button 
                type="button" 
                onClick={() => setFormData({...formData, role: 'Alumni'})}
                style={{ 
                  flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #d4af37', 
                  background: formData.role === 'Alumni' ? '#d4af37' : 'white', 
                  color: formData.role === 'Alumni' ? '#0f284e' : '#d4af37', cursor: 'pointer', fontWeight: 'bold' 
                }}
              >Alumni</button>
            </div>
          </div>

          {/* 2. Basic Info */}
          <div className="form-group">
            <User size={18} className="input-icon" style={{ top: '50%' }} />
            <input name="name" type="text" placeholder="Full Name" className="form-input" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <Mail size={18} className="input-icon" style={{ top: '50%' }} />
            <input name="email" type="email" placeholder="Email Address" className="form-input" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <Lock size={18} className="input-icon" style={{ top: '50%' }} />
            <input name="password" type="password" placeholder="Password" className="form-input" onChange={handleChange} required />
          </div>

          {/* 3. Dept & Batch Row */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <Briefcase size={18} className="input-icon" style={{ top: '50%' }} />
              <select name="department" className="form-input" onChange={handleChange} style={{ background: 'white', cursor: 'pointer' }}>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">Mech</option>
                <option value="CIVIL">Civil</option>
                <option value="AIDS">AI & DS</option>
              </select>
            </div>
            
            <div className="form-group" style={{ flex: 1 }}>
              <Calendar size={18} className="input-icon" style={{ top: '50%' }} />
              <input name="batch" type="text" placeholder="Batch (e.g. 2025)" className="form-input" onChange={handleChange} required />
            </div>
          </div>

          {/* 4. Conditional Fields */}
          {/* Show Roll Number ONLY if Student */}
          {formData.role === 'Student' && (
            <div className="form-group">
              <Hash size={18} className="input-icon" style={{ top: '50%' }} />
              <input name="rollNumber" type="text" placeholder="Register Number" className="form-input" onChange={handleChange} required />
            </div>
          )}

          {/* Show Company Details ONLY if Alumni */}
          {formData.role === 'Alumni' && (
            <>
              <div className="form-group">
                <Building size={18} className="input-icon" style={{ top: '50%' }} />
                <input name="currentCompany" type="text" placeholder="Current Company" className="form-input" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <GraduationCap size={18} className="input-icon" style={{ top: '50%' }} />
                <input name="jobRole" type="text" placeholder="Job Title (e.g. SDE 1)" className="form-input" onChange={handleChange} required />
              </div>
            </>
          )}

          <button type="submit" className="btn-login" disabled={loading} style={{ backgroundColor: formData.role === 'Alumni' ? '#d4af37' : '#0f284e', color: formData.role === 'Alumni' ? '#0f284e' : 'white' }}>
            {loading ? 'Registering...' : `Register as ${formData.role}`}
          </button>

        </form>

        <p className="footer-text">
          Already have an account? <Link to="/login" className="link-gold">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;