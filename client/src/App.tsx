import React, { useState, useEffect } from 'react';
import WebPlayback from './components/WebPlayback';
import Login from './components/Login'
import './App.css';
import { getAuthToken } from './api';

function App() {

  const [token, setToken] = useState('');

  useEffect(() => {

    async function getToken() {
      // const response = await fetch('/auth/token');
      const response = await getAuthToken();
      // const json = await response.json();
      setToken((response as { access_token: string}).access_token);
    }

    getToken();

  }, []);

  return (
    <>
        { (!token) ? <Login/> : <WebPlayback token={token} /> }
    </>
  );
}

export default App;
