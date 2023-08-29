import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export default function App() {
  const [difficulty, setDifficulty] = useState('');
  const [time, setTime] = useState('');

  return (
    <div className="modal-background">
      <div className="modal-content">
        <form className="modal-header">
          <select className="form-select " value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="" selected hidden>Select Level...</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Difficult</option>
            <option value="all">All</option>
          </select>

          <br />

          <select className="form-select mx-3" value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="" selected hidden>Select Time...</option>
            <option value="short">3 min</option>
            <option value="normal">5 min</option>
            <option value="long">10 min</option>
          </select>
          
          <br />

          <div className="button-container">
            <Link to={{ pathname: '/datas', search: `?difficulty=${difficulty}&time=${time}` }}>
              <button className="button">Start</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
