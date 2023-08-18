import React from 'react';
import Signup from '../controllers/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Removed Link
import Signin from '../controllers/Signin';
import auth from '../model/firebase';
import Inside from '../controllers/Inside';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup auth={auth} />} />
        <Route path="/signin" element={<Signin  auth={auth} />} />
        <Route path="/inside/*" element={<Inside />} />

      </Routes>
    </Router>
  );
};

export default App;