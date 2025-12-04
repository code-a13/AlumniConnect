import React, { useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import logo from '../assets/logo.png';
import Loader from '../components/Loader'; // 1. Import Loader

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // 2. Add Loading State
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start Loading
    
    try {
      // Simulate a small delay so you can appreciate the animation (Optional)
      // await new Promise(resolve => setTimeout(resolve, 1500)); 

      const res = await api.post('/auth/login', { email, password });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      toast.success('Login Successful!');
      
      setTimeout(() => {
        const role = res.data.user.role.toLowerCase();
        if (role === 'admin') navigate('/admin-dashboard');
        else navigate('/dashboard');
        setLoading(false); // Stop Loading (though we navigate away)
      }, 1000);

    } catch (error) {
      toast.error(error.response?.data?.message || 'Login Failed');
      setLoading(false); // Stop Loading on Error
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* 3. Show Loader if loading is true */}
      {loading && <Loader />}
      
      <div className="login-container">
        {/* ... (Rest of your existing Login UI code remains same) ... */}
        <div className="logo-section">
          <img src={logo} alt="AlumniConnect Logo" className="logo-img" />
          <h2 className="brand-title">Welcome Back</h2>
          <p className="brand-subtitle">Please sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
           {/* Inputs ... */}
           <div className="form-group">
            <Mail size={20} className="input-icon" />
            <input type="email" placeholder="Email Address" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <Lock size={20} className="input-icon" />
            <input type="password" placeholder="Password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Connecting...' : 'Login'}
          </button>
        </form>
        
        <p className="footer-text">
          Don't have an account? <Link to="/register" className="link-gold">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;