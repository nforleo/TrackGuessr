
import { Button, Stack } from "react-bootstrap";
import { logout } from "../../api";
import { Link } from "react-router-dom";
import { User } from "../../models/User";

interface HomeInterface {
    setUser: (user: User | null) => void;
}

function Home({
  setUser
}: HomeInterface) {
    const _logout = () => {
      logout();
      setUser(null);
    }
   return (
      <Stack gap={3} direction="vertical">
          <Link to="/daily" className="btn btn-primary">
            Daily
          </Link>
          <Link to="/custom" className="btn btn-primary">
            Custom
          </Link>
          <Link to="/stats" className="btn btn-primary">
            Stats
          </Link>
          <Button onClick={() => {
            _logout()
          }}>
            Log Out
          </Button>
      </Stack>
    );
}

export default Home
