import React , {useState} from 'react'
import StarRating from '../components/starRating'
import { ToastContainer, toast, Slide } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "../index.css"
const Feedback = () => {
    const [form, setForm] = useState({
        name: "",
        feedback: "",
        rating: 0
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        // e.preventDefault();
        console.log("Field:", name, "Value:", value); // 
        setForm((prev) => ({
            ...prev,
            [name]:value,
        }))
    }
    const handleSubmit = async() => {
        if (!form.name ){
            toast.error("Please enter your name!");
            return;
        }else if (!form.rating){
            toast.error("Please rate us!");
            return;
        }
        try{
            const result = await fetch("http://localhost:8000/api/feedback/insert",  {
                method: "POST", 
                body: JSON.stringify(form),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await result.json();
            if(data.success){
                toast.success("thankyou for your feedback!");
                setForm({ name: "", feedback: "", rating: 0 });
            }else{
                toast.error("something went wrong");
            }
        }catch(err){
            console.log(err);
        }
    }
    return (
        <section>
            <div className='h-4 w-full bg-[#556B2F]'></div>
            <div className='h-180 grid lg:grid-cols-1 place-items-center '>
                <p className='mt-10 text-5xl '>Tell us what you think !</p>
                <div className='flex flex-row justify-center gap-x-10'>
                    <label className='text-lg'>your name:  </label>
                    <input className='h-6 w-50 border-b border-b-blue-950  shadow-2xl' type="text" name="name"value = {form.name} onChange={handleChange}/>
                </div>
                <div className='h-130 mb-5 w-260 border rounded-2xl  border-gray-200 shadow-2xl bg-slate-50 flex flex-col  items-center'>
                    <StarRating name = "rating"rating={form.rating} setRating={(val) => setForm(prev => ({ ...prev, rating: val }))} ></StarRating>
                    <div>
                        <p className='text-xl h-12 w-45 border border-gray-300 p-2 rounded-2xl bg-[#556B2F] text-white font-medium text-center'>Any suggestions ?</p>
                        <textarea name="feedback"className='h-40 w-200 border border-gray-400 rounded-4xl mt-5' value = {form.feedback} onChange={handleChange}></textarea>
                    </div>
                    <button type='submit' onClick={handleSubmit} className='h-12 w-30 border border-gray-300 bg-[#556B2F] text-white font-medium text-center rounded-2xl text-xl mt-5'>submit</button>
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

export default Feedback;