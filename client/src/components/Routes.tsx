import { Route, Routes as Switch } from 'react-router-dom';
import { Gameboard } from './Gameplay/Gameboard';
import App from '../App';
import { Stats } from '../components/Stats/Stats';

export const Routes = () => {
    return (
        <Switch>
            <Route path="" element={<App />} />
            <Route path="/daily" element={<Gameboard mode="daily" />} />
            <Route path="/custom" element={<Gameboard mode="custom" />} />
            <Route path="/stats" element={<Stats />} />
        </Switch>
    )
}