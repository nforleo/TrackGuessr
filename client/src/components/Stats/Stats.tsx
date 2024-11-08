import { Stack } from "react-bootstrap";
import { UserStats } from "../../models/UserStats"
import { Header } from "../Header";
import { Link } from "react-router-dom";
import { formatTime } from "../Gameplay/utils/logic";
import { User } from "../../models/User";
import { useEffect, useState } from "react";

interface StatsProps {
    user: User;
    getUserStats: (s: string) => Promise<UserStats>;
}

export const Stats = ({
    user,
    getUserStats
}: StatsProps): JSX.Element => {
    const [stats, setStats] = useState<UserStats>({} as UserStats);

    useEffect(() => {
        getUserStats(user.email).then((s) => {
            if (s.score !== undefined) {
                setStats(s);
            }
        });
    }, [user]);

    return <Stack style={{ alignItems: 'center'}}>
        <Header />
        { stats?.score === undefined ? <div>
                    Please complete a daily game to see stats!
                </div> : <div>
                <Stack>
                    <h2>Your Best Stats</h2>
                    <span>
                        Your Score: {stats.score}
                    </span>
                    <span>
                        Number of Mistakes: {stats.mistakes}
                    </span>
                    <span data-testid="stats-time">
                        Your Time: {formatTime(stats.time)}
                    </span>
                </Stack>
                <Link style={{width: 'min-content'}} to="/" className="btn btn-primary">
                    Home
                </Link>
            </div>
        }
    </Stack>
    
}