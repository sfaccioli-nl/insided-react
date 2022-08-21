import { Dispatch, useEffect, useState } from 'react';

interface IUseCredentials {
  token: string | null;
  setToken: Dispatch<React.SetStateAction<string | null>>;
}

const lsKey = 'GH_TOKEN';

export function useCredentials(): IUseCredentials {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(lsKey));

  useEffect(() => {
    if (token) {
      localStorage.setItem(lsKey, token);
    }
  }, [token]);

  return {
    token,
    setToken
  };
}
