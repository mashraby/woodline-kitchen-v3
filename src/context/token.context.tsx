import React, { createContext, useEffect, useState } from "react";

export interface ITokenProps {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
  }

const TokenContext = createContext<ITokenProps>({
  token: null,
  setToken: () => {},
});

function Provider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(window.localStorage.getItem("token") as string || null);

  useEffect(() => {
    window.localStorage.setItem("token", token as string);
  }, [token])

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}

export { TokenContext, Provider };
