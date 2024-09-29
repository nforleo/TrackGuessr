import { Route, Routes as Switch } from 'react-router-dom';
import { Gameboard } from './Gameplay/Gameboard';
import App from '../App';
import { Stats } from '../components/Stats/Stats';
import { UserAtom } from '../atoms/UserAtom';
import { useAtom } from 'jotai';
import { getAuthToken } from '../api';
import { useEffect } from 'react';

export const Routes = () => {
      const [user, setUser] = useAtom(UserAtom); 

        const getToken = async () => {
            const response = await getAuthToken();
            setUser({
                token: (response as { access_token: string}).access_token || '',
                email: '',
                name: ''
            })
        }

        useEffect(() => {
            console.log('Rendering Routes...');
            getToken();
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