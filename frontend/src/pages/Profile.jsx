import React, { useState, useEffect } from 'react';
import { ToastContainer, toast, Slide } from "react-toastify"
import {Link } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import "../index.css"
import { useLocation } from "react-router-dom";
const Profile = () => {
  const location = useLocation();
  const user = location.state?.user;
  const [counter, setCounter] = useState(0);
  const [images, setImages] = useState([]);
  const [expired, isExpired] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    getUserData();
  }, [])
  const handleDeleteSelected = async() => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/file/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ images: selected }),
      });
  
      const data = await res.json();
  
      if (data.success) {
        toast.success("Deleted successfully!");
        // Refresh image list
        setImages(prev => prev.filter(img => !selected.includes(img)));
        setSelected([]);
      } else {
        toast.error("Deletion failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  }
  const getUserData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/file/fetchCount", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      if (res.status == 403){
        toast.warning("Kindly activate a subscription to upload files");
        return;
      }
      if (data.success) {
        setCounter(data.count);
        setImages(data.image);
        return;
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  }
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login first");
        }
        const res = await fetch("http://localhost:8000/api/payment/mysubscription", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const data = await res.json();
        if (data.success) {
          setSubscription(data.subscription);
        }
        if (!data.success && data.flag) {
          isExpired(true);
        }
      } catch (err) {
        toast.error(data.message);
      }
    }
    if (user) fetchSubscription();
  }, [user])
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem("token");
      } catch (err) {
        toast.error("Something went wrong");
      }
    }
  })
  return (
    <section className='flex flex-col '>
      <div className='h-190 flex flex-col items-center'>
        <div className='h-95 w-full bg-[#BAB86C] z-0 absolute'></div>
        <div className='mt-20 h-150 w-300 rounded-2xl shadow-2xl flex flex-col items-center relative border border-green-800 bg-white z-10'>
          <p className='text-6xl font-bold mt-10'>{user?.name}</p>
          <p className='mt-1 text-lg text-gray-500 italic'>member since {user?.dateJoined && new Date(user.dateJoined).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</p>
          <p className='text-lg text-gray-500 italic'>{user?.email}</p>
          {!expired &&
            <>
              {subscription ?
                (<p className='text-lg text-gray-500 italic'>
                  Plan Expires On: {subscription?.expiresOn && new Date(subscription.expiresOn).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>)
                : (<div> </div>)
              }
              <div className='mt-5 grid grid-cols-2 w-full text-center'>
                <div className="w-full h-80 mt-10 border-r border-gray-300">
                  <p className='mt-7 text-4xl font-bold text-red-700 '>SUBSCRIPTION</p>
                 <Link to="/payment"><p className='text-xl font-extralight text-slate-600 mt-4'>
                    {subscription ? `${subscription.plan} - plan - activated` : "Activate Subscription Now !"}
                  </p></Link> 
                </div>
                <div className="w-full  h-80 mt-10">
                  <p className='mt-7 text-4xl font-bold text-red-700 '>DATA UPLOADED</p>
                  {counter === 0 ? (
                    <p className='text-xl font-extralight text-slate-600 mt-4'>No files uploaded</p>
                  ) : (<div className='mt-5 flex flex-col items-center'>
                    {/* <ul className="space-y-2 mx-3 w-120">
                      {images.map((link, index) => {
                        const decodedName = decodeURIComponent(link.split('/').pop()); // decode %20 to space
                        return (
                          <li key={index} className="text-sm text-gray-700 border rounded p-2 bg-gray-100">
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full"
                            >
                              📁 {decodedName}
                            </a>
                          </li>
                        );
                      })}
                    </ul> */}
                    <ul className="space-y-2 mx-3 w-120">
                      {images.map((link, index) => {
                        const decodedName = decodeURIComponent(link.split('/').pop());

                        const isSelected = selected.includes(link);

                        const handleCheckboxChange = () => {
                          setSelected(prev =>
                            isSelected
                              ? prev.filter(img => img !== link)
                              : [...prev, link]
                          );
                        };

                        return (
                          <li
                            key={index}
                            className="text-sm text-gray-700 border rounded p-2 bg-gray-100 flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={handleCheckboxChange}
                            />
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full"
                            >
                              📁 {decodedName}
                            </a>
                          </li>
                        );
                      })}
                    </ul>

                  </div>)}

                </div>
                
              </div>
              {selected.length > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="mt-4 px-4 py-2  bg-green-900 text-white rounded hover:bg-red-700"
                  >
                    Delete ({selected.length})
                  </button>
                )}

            </>}
          {expired &&
            <>
              <div>
                <p className='text-2xl font-bold text-red-700'>SUBSCRIPTION EXPIRED! please subscribe again</p>
              </div>
            </>}
        </div>
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
    </section>
  )
}

export default Profile