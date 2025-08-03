import React, { useState , useContext} from 'react';
import { userContext } from '../context/userContext';
import {ToastContainer, toast , Slide} from "react-toastify"
import { FaGoogle } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import "../index.css"
import {useNavigate} from "react-router-dom";
const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loginForm, setLoginForm] = useState({email: "", password: ""});
  const [registerForm, setRegisterForm] = useState({name:"", email:"", password: ""});
  const {setUser} = useContext(userContext);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,[e.target.name]: e.target.value
    });
  };
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };
  const handleRegisterChange = (e) =>{
    setRegisterForm({...registerForm, [e.target.name]: e.target.value});
  }
  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await fetch (`https://picstack-1wix.onrender.com/api/user/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginForm)
      })

      const data = await res.json();
      if (res.ok){
        localStorage.setItem("token", data.token);
        const userRes = await fetch("https://picstack-1wix.onrender.com/api/user/myprofile", {
          headers: { authorization: `Bearer ${data.token}` },
        });
        const userData = await userRes.json();
        if (userData.success) {
          setUser(userData.user);
        }
        // setUser({loggedIn:true});
        toast.success("Login successful!");
        setTimeout (()=>{
          navigate("/");
        }, 2000);
      }else{
        toast.error(data.message || "Login failed");
        console.log(data.message);
      }
    }catch (error){
      toast.error("Login error");
      console.log("Login error", error);
    }
  }
  const handleRegisterSubmit = async(e)=>{
    e.preventDefault();

    try{
      const res = await fetch("https://picstack-1wix.onrender.com/api/user/signup", {
        method: "POST", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(registerForm)
      })

      const data = await res.json();
      if (res.ok){
        localStorage.setItem("token", data.token);
        const userRes = await fetch("https://picstack-1wix.onrender.com/api/user/myprofile", {
          headers: { authorization: `Bearer ${data.token}` },
        });
        const userData = await userRes.json();
        if (userData.success) {
          setUser(userData.user);
        }
        toast.success("Registered successfully!");
        // if we directly call navigate, the toast component wont  get time to unmount
        setTimeout (()=>{
          navigate("/");
        }, 2000);
        // so we use  setTimout
      }else{
        toast.error(data.message || "Registration failed");
        console.log(data.message);
      } 
    }catch (error){
      toast.error("Error in registration");
      console.log("Error in registration", error);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative w-full max-w-5xl h-[650px] bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: isRegister ? 'translateX(-50%)' : 'translateX(0)' }}>
          {/* Sign In Form */}
          <div className="w-1/2 px-10 py-12 flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-3xl font-semibold text-rose-700">Sign In</h1>
            </div>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none"
                  onChange={handleLoginChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none"
                  onChange={handleLoginChange}
                />
              </div>
              <div className="flex justify-between items-center mb-6 text-sm text-rose-700">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Remember me
                </label>
                <a href="#" className="hover:underline">Forgot password?</a>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-rose-700 hover:bg-blue-800 text-white px-8 py-2 rounded-full font-semibold transition"
                >
                  LOGIN
                </button>
              </div>
            </form>

            <button 
             className="bg-slate-800  hover:bg-blue-800 text-white py-3 mt-5 rounded-full transition"
             onClick={handleGoogleLogin}
            >
              {/* google login code  */}
              <div className='flex flex-row justify-center items-center gap-x-5'>
              <FaGoogle className='w-8 h-8'/>
              <p>Continue with Google</p>
              </div>
            </button>
          </div>

          {/* Sign Up Form */}
          <div className="w-1/2 px-10 py-12 flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-3xl font-semibold text-rose-700">Sign Up</h1>
            </div>
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name='password'
                  placeholder="Password"
                  className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-rose-700 hover:bg-blue-800 text-white px-8 py-2 rounded-full font-semibold transition"
                >
                  SIGN UP
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Switch Panel */}
        <div className="absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center items-center bg-[#757471] text-white rounded-l-[100px] z-10">
          <h1 className="text-4xl font-bold mb-4">{isRegister ? 'Welcome' : 'Hello, Again'}</h1>
          <p className="text-center text-2xl mb-6">
            {isRegister
              ? 'Join Our Unique Platform, Explore a New Experience'
              : 'We are happy to see you back'}
              
          </p>
          <button
            className="border border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-rose-700 transition"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'LOGIN' : 'REGISTER'}
          </button>
        </div>
        <ToastContainer
  position="top-center"
  autoClose={2000}
  hideProgressBar
  newestOnTop
  closeOnClick
  pauseOnHover
  transition={Slide}
  draggable
/>
      </div>
    </div>
  );
};

export default Login;