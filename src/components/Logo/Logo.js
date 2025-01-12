import React from 'react';
import brain from '../../assets/logo.png';

const Logo = ({ onRouteChange }) => {
  return (
    <div style={{ position: 'fixed', top: '10px', left: '10px' }}>
      <div
        className='br2 shadow-2'
        style={{
          height: 100, // Adjusted height
          width: 100,  // Adjusted width
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onClick={() => onRouteChange('home')}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <div style={{ padding: '1rem' }}>
          <img style={{ paddingTop: '5px', height: '100%', width: '100%' }} src={brain} alt='logo' />
        </div>
      </div>
    </div>
  );
}

export default Logo;