import { useState, useEffect } from 'react';
import Home from './components/Home/Home';
import LandingPage from './components/Home/LandingPage'
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
      <div>
        <Header />
        { (!token) ? <LandingPage/> : <Home setToken={setToken}/> }
      </div>
  );
}

export default App;
