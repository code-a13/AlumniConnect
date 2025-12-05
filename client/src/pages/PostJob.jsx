import React, { useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  Briefcase, Building, MapPin, FileText, Code, Link as LinkIcon, 
  ArrowLeft, Send, CheckCircle 
} from 'lucide-react';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    skills: '',
    applyLink: ''
  });
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/jobs/create', formData);
      toast.success('Job Posted Successfully! 🚀');
      setTimeout(() => navigate('/jobs'), 1500);
    } catch (error) {
      toast.error('Failed to post job. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', display: 'flex' }}>
      
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div style={{ 
        marginLeft: isSidebarOpen ? '290px' : '0', 
        width: isSidebarOpen ? 'calc(100% - 290px)' : '100%',
        transition: 'all 0.4s ease',
        padding: '40px' 
      }}>
        
        {/* Navigation Header */}
        <div style={{ maxWidth: '900px', margin: '0 auto 30px' }}>
          <button 
            onClick={() => navigate('/jobs')} 
            style={{ 
              background: 'white', border: 'none', padding: '10px 20px', 
              borderRadius: '30px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontWeight: '600'
            }}
          >
            <ArrowLeft size={18} /> Back to Jobs
          </button>
        </div>

        {/* Main Card */}
        <div style={{ 
          background: 'white', 
          borderRadius: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)', 
          maxWidth: '900px', 
          margin: '0 auto', 
          borderTop: '6px solid #d4af37', // Gold Accent
          overflow: 'hidden'
        }}>
          
          {/* Card Header */}
          <div style={{ padding: '40px', background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
            <h1 style={{ color: '#0f284e', margin: '0 0 10px', fontSize: '28px', fontWeight: 'bold' }}>Post a New Opportunity</h1>
            <p style={{ color: '#666', margin: 0 }}>Share jobs or internships with your junior alumni network.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '40px' }}>
            
            {/* Row 1: Title & Company */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
              <div>
                <label style={labelStyle}>Job Title</label>
                <div style={inputWrapper}>
                  <Briefcase size={18} style={iconStyle} />
                  <input name="title" placeholder="e.g. Senior Software Engineer" onChange={handleChange} style={inputStyle} required />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Company Name</label>
                <div style={inputWrapper}>
                  <Building size={18} style={iconStyle} />
                  <input name="company" placeholder="e.g. Google, Zoho" onChange={handleChange} style={inputStyle} required />
                </div>
              </div>
            </div>

            {/* Row 2: Location & Link */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
              <div>
                <label style={labelStyle}>Location</label>
                <div style={inputWrapper}>
                  <MapPin size={18} style={iconStyle} />
                  <input name="location" placeholder="e.g. Bangalore, Remote" onChange={handleChange} style={inputStyle} required />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Application Link / Email</label>
                <div style={inputWrapper}>
                  <LinkIcon size={18} style={iconStyle} />
                  <input name="applyLink" placeholder="e.g. https://careers.com/apply" onChange={handleChange} style={inputStyle} required />
                </div>
              </div>
            </div>

            {/* Row 3: Skills (Full Width) */}
            <div style={{ marginBottom: '25px' }}>
              <label style={labelStyle}>Required Skills <span style={{color: '#999', fontWeight: '400'}}>(Comma separated)</span></label>
              <div style={inputWrapper}>
                <Code size={18} style={iconStyle} />
                <input name="skills" placeholder="e.g. React, Node.js, Python, AWS" onChange={handleChange} style={inputStyle} required />
              </div>
            </div>

            {/* Row 4: Description (TextArea) */}
            <div style={{ marginBottom: '30px' }}>
              <label style={labelStyle}>Job Description</label>
              <div style={inputWrapper}>
                <FileText size={18} style={{ ...iconStyle, top: '20px' }} />
                <textarea 
                  name="description" 
                  rows="6" 
                  placeholder="Describe the role, responsibilities, and requirements..." 
                  onChange={handleChange} 
                  style={{ ...inputStyle, paddingLeft: '45px', height: 'auto', lineHeight: '1.6' }} 
                  required 
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading} 
              style={{ 
                width: '100%', 
                padding: '16px', 
                background: '#0f284e', 
                color: 'white', 
                border: 'none', 
                borderRadius: '10px', 
                fontSize: '16px', 
                fontWeight: 'bold', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              {loading ? 'Posting Opportunity...' : <><Send size={20} /> Publish Job Post</>}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

// Styles for Cleaner Code
const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' };
const inputWrapper = { position: 'relative' };
const iconStyle = { position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '15px', color: '#999' };
const inputStyle = { 
  width: '100%', 
  padding: '14px 14px 14px 45px', 
  borderRadius: '10px', 
  border: '1px solid #e5e7eb', 
  fontSize: '15px', 
  outline: 'none',
  background: '#f9fafb',
  transition: 'border 0.3s'
};

export default PostJob;