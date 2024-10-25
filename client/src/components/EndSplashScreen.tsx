import { Stack } from "react-bootstrap";
import { UserStats } from "../models/UserStats"
import { Header } from "./Header";

interface EndSplashScreenProps {
    stats: UserStats;
}

export const EndSplashScreen = ({
    stats
}: EndSplashScreenProps): JSX.Element => {
    return <Stack>
        <Header />
    </Stack>
}