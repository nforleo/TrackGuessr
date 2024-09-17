// import React, { useState, useEffect } from 'react';

import { useEffect } from "react";
import { Button, Stack } from "react-bootstrap";
import { logout } from "../api";

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
                <Button>
                  Daily
                </Button>
                <Button>
                  Custom
                </Button>
                <Button>
                  Stats
                </Button>
                <Button onClick={() => {
                  _logout()
                }}>
                  Log Out
                </Button>
              </Stack>
    );
}

export default Home
