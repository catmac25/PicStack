import React , {useEffect, useState}from 'react'

const Success = () => {
    const [message, setMessage]= useState("Processing your payment...");
    const [error, setError] = useState(null);

    useEffect(()=>{
        const updatePaymentStatus = async () =>{
            const sessionId = new URLSearchParams(window.location.search).get('session_id');
            if (!sessionId) {
              setMessage('No session ID found in URL.');
              return;
            }

            try {
                const response = await fetch(`http://localhost:2000/api/payment/mark-paid/${sessionId}`, {
                  method: 'PATCH',
                });
        
                const data = await response.json();
        
                if (response.ok && data.success) {
                  setMessage('Payment successful! Thank you for your purchase.');
                } else {
                  setError(data.message || 'Failed to update payment status.');
                }
              } catch (err) {
                setError('Network error: ' + err.message);
              }
            };

            updatePaymentStatus();
    },[]);
  return (
    <div className="text-center mt-20">
      {error ? (
        <div className="text-red-600 font-semibold">{error}</div>
      ) : (
        <div className="text-green-600 text-xl font-bold">{message}</div>
      )}
    </div>
  )
}

export default Success