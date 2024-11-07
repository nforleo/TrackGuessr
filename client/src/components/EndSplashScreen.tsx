import { Button, Stack } from "react-bootstrap";
import { UserStats } from "../models/UserStats"
import { Header } from "./Header";
import { Link } from "react-router-dom";
import { formatTime } from "./Gameplay/utils/logic";
import { User } from "../models/User";
import { useEffect } from "react";
import { updateStats } from "../api";

interface EndSplashScreenProps {
    stats: UserStats;
    user: User
}

export const EndSplashScreen = ({
    stats,
    user
}: EndSplashScreenProps): JSX.Element => {

    useEffect(() => {
        updateStats(user.email, stats);
    }, [user]);

    return <Stack style={{ alignItems: 'center'}}>
        <Header />
        <Stack>
            <span>
                Your Score: {stats.score}
            </span>
            <span>
                Number of Mistakes: {stats.mistakes}
            </span>
            <span>
                Your Time: {formatTime(stats.time)}
            </span>
        </Stack>
        <Link style={{width: 'min-content'}} to="/" className="btn btn-primary">
            Home
        </Link>
    </Stack>
}