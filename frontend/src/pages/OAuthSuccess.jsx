import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';

function OAuthSuccess() {
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      const payload = token.split(".")[1]; // Get the middle part
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = JSON.parse(atob(base64));

      const userObj = {
        name: decodedPayload.name,
        email: decodedPayload.email,
        id: decodedPayload.id,
      };

      localStorage.setItem("user", JSON.stringify(userObj));
      setUser(userObj);
      navigate("/");
    }
  }, [setUser, navigate]);

  return <div>Logging you in with Google...</div>;
}

export default OAuthSuccess;
