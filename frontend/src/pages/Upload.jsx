import React, { useState , useEffect} from 'react';
// import { userContext } from '../context/userContext';
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "../index.css"
const Upload = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [counter, setCounter] = useState(0);
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files).slice(0, 4);
        setFiles(selectedFiles);
    };
    useEffect(() => {
        getUserData();
    }, [])
    const getUserData = async() =>{
        const t = localStorage.getItem("token");
        if (t!=  null){
        try{
            const res = await fetch("http://localhost:8000/api/file/fetchCount", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
            });
            const data = await res.json();
            if (res.status===403){
                toast.error("Please activate subscription first");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
                return;
            }
            // if (res.status == 401){
            //     toast.error("please login first");
            //     setTimeout(() => {
            //         navigate('/');
            //     },2000);
            // }
            if (data.success){
                setCounter(data.count);
                return;
            }else if (res.status != 401){
                toast.error("Something went wrong!");
            }
        }catch(err){
            console.log(err);
            toast.error("Something went wrong!");
        }
    }
    }
    const handleFileSubmit = async (e) => {
        e.preventDefault();
        if (files.length === 0) {
            toast.error("Please select a file.");
            return;
        }
        console.log("clicked");
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("images", file);
        });


        try {
            const res = await fetch("http://localhost:8000/api/file/upload", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: formData
            });
            // if (res.status===404){
            //     toast.error("Please activate subscription first");
            //     setTimeout(() => {
            //         navigate('/');
            //     }, 2000);
            //     return;
            // }
            if (res.status === 401) {
                toast.error("Unauthorized. Please login first.");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
                return;
            }
            
            if (res.ok) {
                toast.success("File uploaded Successfully");
                navigate('/');
            } else {
                toast.error("Upload Failed!");
                return;
            }
        } catch (err) {
            toast.error("Error uploading file");
            console.log("error while uploading file", err);
        }
    }
    return (
        <section className='bg-white'>
            <br />
            <div className='flex flex-col mt-15 justify-center items-center'>
                <div className='text-5xl font-bold text-center'>
                    Choose Your Favourite Files
                </div>
                <div className='text-lg font-extralight mt-6 text-green-800'>
                    one file at a time bestie! Let's not rush the vibe !
                </div>
            </div>
            <br />
            <div className='h-80 w-full flex flex-col items-center flex-grow '>

                <form onSubmit={handleFileSubmit} className='flex px-15 flex-col border border-gray-200 rounded-2xl shadow-2xl items-center text-xl py-3'>
                    <label className="cursor-pointer border border-gray-300 rounded px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold mt-2">
                        click to choose files
                        <input
                            type="file"
                            name="fileProfile"
                            onChange={handleFileChange}
                            className="hidden"
                            multiple
                            accept="image/*,application/pdf" // optional: filter allowed files
                        />
                    </label>

                    {files.length > 0 && (
                        <div className="mt-4 w-full max-w-md ">
                            <h3 className="text-base font-semibold mb-2 text-gray-800">Selected Files:</h3>
                            <ul className="list-disc list-inside text-gray-700 break-words space-y-1">
                                {files.map((file, idx) => (
                                    <li key={idx}>{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button className="h-10 w-30 border border-blue-300 bg-blue-600 text-white flex items-center justify-center font-medium mt-3 mb-2 rounded px-4 py-1">
                        Submit
                    </button>
                </form>
                <div className='mt-10 text-md '>
                    <p>Current Collection Count : {counter} </p>
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

export default Upload