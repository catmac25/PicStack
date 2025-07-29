import React, { useEffect, useState } from 'react'

const Cancel = () => {
    const [message, setMessage] = useState("Cancelling payment...");

    useEffect(() => {
        const cancelPayment = async () => {
            const sessionId = new URLSearchParams(window.location.search).get('session_id');
            if (!sessionId) {
                setMessage('No session ID found.');
                return;
            }


            try{
                const res = await fetch(`http://localhost:2000/api/payment/mark-failed/${sessionId}`, {
                    method: 'PATCH',
                  });
                  const data = await res.json();
          
                  if (res.ok && data.success) {
                    setMessage('Payment was cancelled. No charges were made.');
                  } else {
                    setMessage('Failed to update payment status.');
                  }
        }catch(err){
            setMessage("Network error while cancelling payment");
            console.log(err)
        }
    };
    cancelPayment();
    }, []);
    return (
        <div className="text-center mt-20">
      <h1 className="text-red-600 text-2xl font-bold">Payment Cancelled</h1>
      <p>{message}</p>
    </div>
    )
}

export default Cancel