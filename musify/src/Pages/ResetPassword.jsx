import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { _Auth } from "../Backend/Firebase";
import toast from "react-hot-toast";

const ResetPassword = () => {
    let [email, setEmail] = useState("");

    function handleChange(e){
        setEmail(e.target.value)
    }
    async function handleSubmit(e){
        e.preventDefault()
        try{
            await sendPasswordResetEmail(_Auth,email)
            toast.success(`Reset Link has sent to ${email}`)
        }      
        catch(err){
            toast.error(err.code)
        }  
        setEmail(email="")
    }
    return (
        <section className="w-full h-[calc(100vh-70px)] bg-slate-800 flex flex-col justify-center items-center">
            <header className="font-bold text-3xl text-purple-400 tracking-wider">
                <h1>ResetPassword</h1>
            </header>
            <main>
                <form
                    onSubmit={handleSubmit}
                    className="w-[400px]  bg-slate-900 mt-4 p-5 border-b-2 caret-purple-400">
                    <div className="py-2">
                        <label
                            htmlFor="email"
                            className="text-white font-bold tracking-wider">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full border text-white border-white px-3 py-2 rounded focus:outline-0 placeholder:text-white"/>
                    </div>
                    <div className="py-2">
                        <button
                            type="submit"
                            className=" tracking-wider w-full bg-purple-600  py-2 rounded text-white font-bold">
                            ResetPassword
                        </button>
                    </div>
                    <div className='text-white text-[14px] flex justify-center mt-1.5 '>
                    <NavLink to="/login" className="hover:text-purple-400 underline">Back to login</NavLink>
                </div>
                </form>
            </main>
        </section>
    );
};

export default ResetPassword;
