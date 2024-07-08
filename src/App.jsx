import './scss/style.scss';

import React from 'react';
import Header from "./components/Header.jsx";
import Sidebar from './components/Sidebar.jsx';
import Scoreboard from './components/Scoreboard.jsx';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import Sport from './components/Sport.jsx';
import Country from './components/Country.jsx';
import League from './components/League.jsx';
import Game from './components/Game.jsx';


function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" Component={Sport} />
        <Route path="/:sport" Component={Sport} />
        <Route path="/:sport/:country" Component={Country} />
        <Route path="/:sport/:country/:league" Component={League} />
        <Route path="/:sport/:country/:league/:match" Component={Game} />
      </Routes>
    </Router>
  );
}

export default App;
