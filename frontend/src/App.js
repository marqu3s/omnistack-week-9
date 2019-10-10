import React, { useState } from 'react';
import api from './services/api';
import './App.css';
import logo from './assets/logo.svg';

function App() {
  console.log(process.env.NODE_ENV);

  // App states
  const [email, setEmail] = useState('');

  // Handles form submit
  function handleSubmit(event) {
    event.preventDefault();
    console.log(email);
  }

  return (
    <div className="container">
      <img src={logo} className="logo" alt="AirCnC" />

      <div className="content">
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail *</label>
          <input
           id="email"
           type="email"
           placeholder="Seu e-mail"
           value={email}
           onChange={event => setEmail(event.target.value)}
          />
          <button className="btn" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
