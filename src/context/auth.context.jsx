import { createContext, useEffect, useState } from "react";
import service from "@/services/index.service.js";
import Loader from "@/components/shared/Loader.jsx";

// Context => shares "who is logged in" with the whole app
const AuthContext = createContext();

// Wrapper => holds the logged-in user and gives it to every page / component
function AuthWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerifyingUser, setIsVerifyingUser] = useState(true);


  const getUser = async () => {
    try {
      const response = await service.get("/users/me");

      setUser(response.data.user);
      setIsLoggedIn(true);
      setIsVerifyingUser(false);
      
    } catch (error) {

      console.log(error);
      setUser(null);
      setIsLoggedIn(false);
      setIsVerifyingUser(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsLoggedIn(false);
  };

  const passedContext = {
    user,
    isLoggedIn,
    getUser,
    logout,
  };

  if (isVerifyingUser) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={passedContext}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
