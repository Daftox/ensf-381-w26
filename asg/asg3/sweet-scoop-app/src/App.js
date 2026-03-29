import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import FlavorsPage from './components/FlavorsPage';
// import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/flavors" element={<FlavorsPage />} />
          {/*<Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;