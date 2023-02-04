import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  // check user is currently logged
  useEffect(() => {
    // logout if the cookie is removed
    async function getUserId() {
      fetch("http://localhost:4001/me", { credentials: "include" })
        .then((res) => res.json())
        .then((result) => {
          if (!result.userId) {
            setUser(null);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getUserId();
  }, []);
  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    // logout from the server
    fetch("http://localhost:4001/logout", { credentials: "include" })
      .then((res) => res.json)
      .then((data) => {
        console.log(data);
      });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
