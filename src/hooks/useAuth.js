import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useLocalStorage("user", userData);
  const navigate = useNavigate();

  const login = async (data) => {
    alert("Logging in...")
    return;
    setUser(data);
    navigate("/home", { replace: true });
    console.log("Logging in...")
    alert("Logging in...")
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
    console.log("Logging out...")
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );
  console.log(user);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};