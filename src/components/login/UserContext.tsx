import React, { useState } from 'react';
import { useContext } from 'react';

type LoginContextType = {
  loggedIn: boolean;
  setLoggedIn: (status: boolean) => void;
};

const loginContextDefaultValues = {
  loggedIn: false,
  setLoggedIn: () => {},
};

export const LoginContext = React.createContext<LoginContextType>(
  loginContextDefaultValues,
);

export const LoginProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(loginContextDefaultValues.loggedIn);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export function useLoginContext() {
  return useContext(LoginContext);
}
