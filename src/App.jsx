import React, { createContext } from "react";
import useExtractAccessToken from "./hooks/useExtractAccessToken";
import Login from "./pages/login";
import Main from "./pages/main";
import { ChakraProvider } from '@chakra-ui/react'

export const AuthContext = createContext();

function App() {
  const [accessToken] = useExtractAccessToken();

  return (
    <div className="App">
      <ChakraProvider>
        <AuthContext.Provider value={{ accessToken }}>
          {accessToken ? <Main /> : <Login />}
        </AuthContext.Provider>
      </ChakraProvider>
    </div>
  );
}

export default App;
