import React from 'react';
import logo from '../assets/logo.png';

const Loader = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Clean white transparent bg
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(5px)'
    }}>
      
      {/* Main Loader Container */}
      <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* Ring 1: GOLD (Spinning Clockwise) */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '4px solid transparent',
          borderTopColor: '#d4af37', // Gold
          animation: 'spin 1.2s linear infinite'
        }}></div>

        {/* Ring 2: NAVY (Spinning Counter-Clockwise) */}
        <div style={{
          position: 'absolute',
          width: '85%',
          height: '85%',
          borderRadius: '50%',
          border: '4px solid transparent',
          borderBottomColor: '#0f284e', // Navy
          animation: 'spinReverse 1s linear infinite' // Faster reverse spin
        }}></div>

        {/* Center Logo */}
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 0 15px rgba(0,0,0,0.1)'
        }}>
           <img 
             src={logo} 
             alt="Loading..." 
             style={{ 
               width: '45px', 
               height: '45px',
               objectFit: 'contain'
             }} 
           />
        </div>

      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes spinReverse {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;