import React from 'react';
import CosmicBackground from '../components/CosmicBackground';

const Home = () => {
  return (
    <div style={{ position: 'relative', color: 'white', textAlign: 'center', height: '100vh' }}>
      <CosmicBackground />
      <h1>Welcome to My Cosmic Portfolio</h1>
      <p>Exploring the Universe through Space, Physics, and Code</p>
      <button
        style={{
          padding: '10px 20px',
          fontSize: '1.2em',
          marginTop: '20px',
          cursor: 'pointer',
          background: 'white',
          color: 'black',
          border: 'none',
          borderRadius: '5px',
        }}
        onClick={() => window.location.href = '/projects'}
      >
        See My Work
      </button>
    </div>
  );
};

export default Home;
