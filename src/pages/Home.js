import React from 'react';
import CosmicBackground from '../components/CosmicBackground';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); // Use navigate for smooth routing

  return (
    <div style={styles.homeContainer}>
      <CosmicBackground />
      <div style={styles.textContent}>
        <h1 style={styles.title}>Welcome to My Cosmic Portfolio</h1>
        <p style={styles.subtitle}>Exploring the Universe through Space, Physics, and Code</p>
        <button style={styles.ctaButton} onClick={() => navigate('/projects')}>
          See My Work
        </button>
      </div>
    </div>
  );
};

// Styling object for better code organization
const styles = {
  homeContainer: {
    position: 'relative',
    color: 'white',
    textAlign: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContent: {
    zIndex: 1, // Ensures text appears above the background
  },
  title: {
    fontSize: '3.5em',
    fontWeight: 'bold',
    margin: 0,
    textShadow: '0 0 10px rgba(255,255,255,0.5)',
    background: 'linear-gradient(45deg, #fff, #8884)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'glow 2s ease-in-out infinite alternate',
  },
  '@keyframes glow': {
    from: {
      textShadow: '0 0 10px rgba(255,255,255,0.5)',
    },
    to: {
      textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(70,131,255,0.6)',
    },
  },
  subtitle: {
    fontSize: '1.5em',
    margin: '10px 0 20px 0',
    color: '#adf',
    textShadow: '0 0 5px rgba(170,221,255,0.5)',
  },
  ctaButton: {
    padding: '12px 25px',
    fontSize: '1.2em',
    cursor: 'pointer',
    background: 'rgba(255,255,255,0.1)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '5px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 0 20px rgba(255,255,255,0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255,255,255,0.2)',
      boxShadow: '0 0 30px rgba(255,255,255,0.2)',
    },
  },
};

export default Home;
