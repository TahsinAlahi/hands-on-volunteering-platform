import { createContext, useContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const authContext = createContext(null);

function AuthProvider({ children }) {
  const axiosPublic = useAxiosPublic();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  async function signup(name, email, password) {
    setIsAuthLoading(true);
    try {
      const res = await axiosPublic.post("/auth/signup", {
        name,
        email,
        password,
      });
      if (res.status === 200) {
        toast.success("User created successfully");
        return { status: "success" };
      }
    } catch (error) {
      if (error?.response?.status === 409) {
        toast.error("User already exists");
        return { status: "error", message: "User already exists" };
      } else {
        toast.error("Something went wrong");
        return { status: "error", message: "Something went wrong" };
      }
    } finally {
      setIsAuthLoading(false);
    }
  }

  async function login(email, password) {
    setIsAuthLoading(true);

    try {
      const res = await axiosPublic.post("/auth/login", {
        email,
        password,
      });
      if (res.status === 200) {
        setUser({
          name: res.data.name,
          email: res.data.email,
          id: res.data.id,
        });

        toast.success("Login successful");
        return { status: "success" };
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        if (error?.response?.data?.message === "Invalid password") {
          toast.error("Invalid credentials");
          return { status: "error", message: "Invalid credentials" };
        } else if (error?.response?.data?.message === "User does not exist") {
          toast.error("User does not exist");
          return { status: "error", message: "User does not exist" };
        }
      } else {
        toast.error("Something went wrong");
        return { status: "error", message: "Something went wrong" };
      }
    }
  }

  // set user in localstorage
  useEffect(() => {
    isAuthLoading(true);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    isAuthLoading(false);
  }, [user]);

  const value = { signup, isAuthLoading, login, user };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthProvider;

export function useAuth() {
  const context = useContext(authContext);
  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
}
