import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage'
import './App.css';
import { getAuthToken } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header} from './components/Header';

function App() {

  const [token, setToken] = useState('');

  useEffect(() => {

    async function getToken() {
      const response = await getAuthToken();
      setToken((response as { access_token: string}).access_token);
    }

    getToken();

  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        { (!token) ? <LandingPage/> : <Home setToken={setToken}/> }
      </BrowserRouter>
    </div>
  );
}

export default App;
