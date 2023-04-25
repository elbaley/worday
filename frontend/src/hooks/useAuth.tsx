import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

// Set the type of the context value
type AuthContextType = {
  user: any;
  login: (data: any) => void;
  logout: () => void;
};

// Assign the AuthContextType as the type of the context value
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Set the type of the state variable and initial value
  const [user, setUser] = useLocalStorage("user", null);

  useEffect(() => {
    async function getUserId() {
      try {
        // Add await to fetch() call and remove unnecessary catch block
        const res = await fetch("http://localhost:4001/me", { credentials: "include" });
        const result = await res.json();
        if (!result.userId) {
          setUser(null);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getUserId();
  }, []);

  const login = async (data: any) => {
    setUser(data);
  };

  const logout = () => {
    setUser(null);
    // Add await to fetch() call and add parentheses to res.json() method
    fetch("http://localhost:4001/logout", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const value = useMemo(() => ({
    user,
    login,
    logout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
