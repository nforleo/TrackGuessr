import { useState, useEffect } from 'react';
import Home from './components/Home/Home';
import LandingPage from './components/Home/LandingPage'
import './App.css';
import { getAuthToken } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header} from './components/Header';
import { useAtomValue } from 'jotai';
import { UserAtom } from './atoms/UserAtom';
import { User } from './models/User';

interface AppProps {
  setUser: (user: User | null) => void;
}

function App({
  setUser,
}: AppProps) {
  const user = useAtomValue(UserAtom);

  console.log('App - user', user);

  return (
      <div>
        <Header />
        { (!user?.token) ? <LandingPage/> : <Home setUser={setUser}/> }
      </div>
  );
}

export default App;
