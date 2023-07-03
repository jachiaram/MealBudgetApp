import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar.js";
import Home from "./screens/Home.js"
import MyLists from "./screens/MyLists.js"
import Account from "./screens/Account.js"
import About from "./screens/About.js"

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
       <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mylists' element={<MyLists />} />
          <Route path='/account' element={<Account />} />
          <Route path='/about' element={<About />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
