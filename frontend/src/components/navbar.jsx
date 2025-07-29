import React, { useContext } from 'react';
import icon from "../assets/imgicon.png";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

function Navbar() {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");  
    setUser(null);                    
    navigate("/loginregister");
  };

  const handleLogin = () => {
    navigate("/loginregister");
  };

  return (
    <section className='flex flex-row justify-around gap-x-55 h-25 w-screen shadow-xl bg-black/50 backdrop-blur-md items-center'>
      <div>
        <Link to="/"><img src={icon} className='h-10 w-10' alt="logo" /></Link>
      </div>

      <div className='grid lg:grid-cols-4 lg:gap-x-10 lg:grid-rows-1 grid-cols-1 grid-rows-4 gap-y-2 items-center'>
        <Link to="/upload" className='text-2xl font-bold px-4 py-1 rounded text-white hover:bg-black hover:text-white'>Upload</Link>
        <Link to="/payment" className='text-2xl font-bold px-4 py-1 rounded text-white hover:bg-black hover:text-white'>Pricing</Link>

        {user ? (
          <>
            <Link to="/myprofile" state={{user}}><span className='text-2xl font-semibold text-white'>Hello, {user.name}</span></Link>
            <button
              onClick={handleLogout}
              className='text-2xl font-bold text-white bg-pink-700 px-4 py-1 rounded hover:bg-red-600'>
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className='text-2xl font-bold text-white  px-4 py-1 rounded hover:bg-black hover:text-white'>
            Login
          </button>
        )}
      </div>
    </section>
  );
}

export default Navbar;
