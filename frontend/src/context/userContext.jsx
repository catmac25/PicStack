import React, { createContext, useState, useEffect } from "react";
export const userContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:8000/api/user/myprofile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        console.warn(data.message);
        localStorage.removeItem("user"); 
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      localStorage.removeItem("user"); 
    }
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    console.log("user from localStorage:", userStr);
    if (userStr) {
      setUser(JSON.parse(userStr));
      fetchUser();
    } else {
      fetchUser(); // fallback to backend if user not stored
    }
  }, []);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
