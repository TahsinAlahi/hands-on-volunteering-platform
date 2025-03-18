import { createContext, useContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

const authContext = createContext(null);

function AuthProvider({ children }) {
  const axiosPublic = useAxiosPublic();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  // const [user, setUser] = useState({});

  async function signup(name, email, password) {
    setIsAuthLoading(true);
    try {
      const res = await axiosPublic.post("/auth/signup", {
        name,
        email,
        password,
      });
      console.log(res);
    } catch (error) {
      console.log("signup error", error);
    } finally {
      setIsAuthLoading(false);
    }
  }

  async function login(email, password) {
    setIsAuthLoading(true);

    console.log(email, password);

    try {
      const res = await axiosPublic.post("/auth/login", {
        email,
        password,
      });
      console.log(res.data);
      return { status: "success" };
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // async function getUser() {
    // const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    // }
  }, []);

  const value = { signup, isAuthLoading, login };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthProvider;

export function useAuth() {
  const context = useContext(authContext);
  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
}
