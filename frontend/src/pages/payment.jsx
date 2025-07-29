import React, {useContext} from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { userContext } from '../context/userContext';
import {ToastContainer, toast , Slide} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "../index.css"
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { set } from 'mongoose';
const stripePromise = loadStripe("pk_test_51RXyPt4YjYeEnDoe3kI43ypuTnPBLkZ7IRfBDsKiiBk3Xjh8GvbeLQP67p8jZQ0XkP4div3TJmF6iZhoue3b8ND500DG74xERG");

const Payment = () => {
    const navigate = useNavigate();
    const {setUser} = useContext(userContext);
    const handleFreeSubscription = async() => {
        const token = localStorage.getItem("token"); // get token

        if (!token) {
            toast.error("Please log in first");
            setTimeout(()=> {
                navigate('/login');
            }, 2000);
            return;
        }
        try{
            const res = await fetch('http://localhost:8000/api/payment/free-subscribe', {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }, 
                body: JSON.stringify({ plan: "Free", price: 0 }),
            });

            const data = await res.json();
            if (res.ok){
                const userRes = await fetch("http://localhost:8000/api/user/myprofile", {
                    headers: { authorization: `Bearer ${token}` },
                });
                const userData = await userRes.json();
               
                if (userData.success){
                    setUser(userData.user);
                    toast.success("Free Plan activated successfully");
                    setTimeout(()=> {
                        navigate('/');
                    }, 2000);
                }
                else{
                    toast.error(data.message || "Something went wrong");
                }
            }else{
                toast.error(data.message || "Something went wrong");
            }
        }catch(err){
            toast.error("error in activating subscription");
            console.log("error in activating subscription", err);
        }
    }
    const handleSubscribe = async (plan, price) => {
        const token = localStorage.getItem("token"); // get token
        if (!token) {
            toast.error("Please log in first");
            setTimeout(()=> {
                navigate('/login');
            }, 2000);
            return;
        }
        try{
        const stripe = await stripePromise;
        const response = await fetch(`http://localhost:8000/api/payment/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ plan, price })
        });

        const data = await response.json();
        if (response.status == 401){
            toast.error("Please login first");
            setTimeout(()=> {
                navigate('/');
            }, 2000);
        }
        if (response.ok){
                const userRes = await fetch("http://localhost:8000/api/user/myprofile", {
                    headers: { authorization: `Bearer ${data.token}` },
                });
                const userData = userRes.json();
                if (userData.success){
                    setUser(userData.user);
                }
                await stripe.redirectToCheckout({ sessionId: data.id });
         }else if (response.status != 401 && response.status!=200){
                    toast.error(data.message || "Something went wrong");
                }
        }
        catch(err){
            toast.error("Internal Server error");
            console.log(err);
        }
    }
    return (
        <section>
            <div>
                <br />
                <br />
                <div className='text-5xl font-bold text-center'>
                    Choose Your Plan
                </div>
                <br />
                <br />
                <div className='grid lg:grid-cols-3 lg:grid-rows-1 grid-cols-1 grid-rows-2 place-items-center gap-x-5'>
                <div className='h-100 w-100 rounded-2xl border shadow-2xl border-gray-100 flex flex-col justify-center items-center'>
                        <p className='text-2xl font-medium'>Free Plan</p>
                        <p className='text-lg'>Rs. 0/month</p>
                        <br />
                        <br />
                        <ul>
                            <div className='flex flex-row gap-x-10'>
                                <FaCheck className='h-5 w-5' />
                                <li>Basic Features Access</li>
                            </div>
                            <div className='flex flex-row gap-x-10'>
                                <FaCheck className='h-5 w-5' />
                                <li>Only 40 pictures</li>
                            </div>
                        </ul>
                        <br />
                        <br />
                        <button className='h-10 w-50 border border-blue-200 bg-blue-100 hover:bg-blue-700 hover:text-white'
                            onClick = {handleFreeSubscription}>Subscribe Now</button>
                    </div>
                    <div className='h-100 w-100 rounded-2xl border shadow-2xl border-gray-100 flex flex-col justify-center items-center'>
                        <p className='text-2xl font-medium'>Simple Plan</p>
                        <p className='text-lg'>Rs. 60/month</p>
                        <br />
                        <br />
                        <ul>
                            <div className='flex flex-row gap-x-10'>
                                <FaCheck className='h-5 w-5' />
                                <li>Basic Features Access</li>
                            </div>
                            <div className='flex flex-row gap-x-10'>
                                <FaCheck className='h-5 w-5' />
                                <li>40 pictures per month</li>
                            </div>
                            <div className='flex flex-row gap-x-10'>
                                <FaCheck className='h-5 w-5' />
                                <li>Weekly Automatic Updates</li>
                            </div>
                        </ul>
                        <br />
                        <br />
                        <button className='h-10 w-50 border border-blue-200 bg-blue-100 hover:bg-blue-700 hover:text-white'
                            onClick={()=> handleSubscribe('Simple', 60)}> Subscribe Now</button>
                    </div>
                    <div className='h-100 w-100 border rounded-2xl shadow-2xl border-gray-100 flex flex-col justify-center items-center'>
                        <p className='text-2xl font-medium'>Best Plan</p>
                        <p className='text-lg'>Rs. 100/month</p>
                        <br />
                        <br />
                        <ul>
                            <div className='flex flex-row gap-x-10'>
                                <FaCheck className='h-5 w-5' />
                                <li>Advanced Features Access</li>
                            </div>
                            <div className='flex flex-row gap-x-10'>
                                <FaCheck className='h-5 w-5' />
                                <li>Unlimited pics in one month</li>
                            </div>
                            <div className='flex flex-row gap-x-10'>
                                <FaCheck className='h-5 w-5' />
                                <li>Weekly Automatic Updates</li>
                            </div>
                            <div className='flex flex-row gap-x-10'>
                                <FaCheck className='h-5 w-5' />
                                <li>Priority Support</li>
                            </div>
                            <div className='flex flex-row gap-x-10'>
                                <FaCheck className='h-5 w-5' />
                                <li>Advanced picture Editing</li>
                            </div>
                        </ul>
                        <br />
                        <br />
                        <button className='h-10 w-50 border border-blue-200 bg-blue-100 hover:bg-blue-700 hover:text-white'
                            onClick={()=>handleSubscribe('Best', 100)}> Subscribe Now</button>
                    </div>
                </div>
                <br />
                <br />
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

export default Payment