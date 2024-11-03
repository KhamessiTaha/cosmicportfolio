import React from 'react';
import CosmicBackground from './components/CosmicBackground';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
      <Router>
          <div>
              <CosmicBackground />
              
              <Routes>
                
              </Routes>
          </div>
      </Router>
  );
};

export default App;