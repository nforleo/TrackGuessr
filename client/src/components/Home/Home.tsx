
import { Button, Stack } from "react-bootstrap";
import { logout } from "../../api";
import { Link } from "react-router-dom";

interface HomeInterface {
    setToken: (str: string) => void;
}

function Home({
  setToken
}: HomeInterface) {
    const _logout = () => {
      logout();
      setToken('');
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
