import { Route, Routes as Switch } from 'react-router-dom';
import { Gameboard } from './Gameplay/Gameboard';
import App from '../App';
import { Stats } from '../components/Stats/Stats';
import { UserAtom } from '../atoms/UserAtom';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { getToken, getUser } from './LoginLogic';

export const Routes = () => {
      const [user, setUser] = useAtom(UserAtom); 

        useEffect(() => {
            console.log('Rendering Routes...');
            getToken(setUser);
            getUser(setUser, user);
        }, []);

    return (
        <Switch>
            <Route path="" element={<App setUser={setUser}/>} />
            <Route path="/daily" element={<Gameboard mode="daily"/>} />
            <Route path="/custom" element={<Gameboard mode="custom"/>} />
            <Route path="/stats" element={<Stats/>} />
        </Switch>
    )
}