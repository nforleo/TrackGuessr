import { Button, Stack } from "react-bootstrap";
import { UserStats } from "../models/UserStats"
import { Header } from "./Header";
import { Link } from "react-router-dom";
import { formatTime } from "./Gameplay/utils/logic";

interface EndSplashScreenProps {
    stats: UserStats;
}

export const EndSplashScreen = ({
    stats
}: EndSplashScreenProps): JSX.Element => {
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