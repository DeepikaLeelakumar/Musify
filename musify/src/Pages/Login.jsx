import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { _Auth } from '../Backend/Firebase';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate()
    let [data,setData] = useState({
        useremail:"",
        userpassword:""
    });

    let {useremail,userpassword} = data;

function handleChange(e){
    setData({...data,[e.target.name]:e.target.value})
}

async function handleSubmit(e){
    e.preventDefault();
    try{
    let userData = await signInWithEmailAndPassword(_Auth,useremail,userpassword)
    if(userData.user.emailVerified === true){
        toast.success("you login is successfull")
        window.location.assign("/")
        
    }
    else{
        toast.error("Email not verified!")
    }
    // console.log(userData)
}catch(err){
    toast.error(err.code)
}

    setData({
        useremail:"",
        userpassword:""
    })
}
let [eye,setEye] = useState(false);

  return (
    <section className='w-full h-[calc(100vh-70px)] bg-slate-800 flex flex-col justify-center items-center'>
        <header className='font-bold text-3xl text-purple-400 tracking-wider'>
            <h1>Login</h1>
        </header>
        <main>
            <form onSubmit={handleSubmit} className='w-[400px]  bg-slate-900 mt-4 p-5 border-b-2 caret-purple-400'>
                
                <div className='py-2'>
                    <label htmlFor="email" className='text-white font-bold tracking-wider'>Email</label>
                    <input type="email" name='useremail' id='email' value={useremail} onChange={handleChange} placeholder='Enter your email' className='w-full border text-white border-white px-3 py-2 rounded focus:outline-0 placeholder:text-white'/>
                </div>
                <span className='relative'>
                <div className='py-2'>
                    <label htmlFor="password" className='text-white font-bold tracking-wider'>Password</label>
                    <input type={eye? "text":"password"} name='userpassword' id='password' autoComplete='' value={userpassword} onChange={handleChange} placeholder='Enter your Password' className='w-full border text-white border-white px-3 py-2 rounded focus:outline-0 placeholder:text-white'/>
                    
                </div>
                <span className='absolute right-5 top-11 text-purple-400 cursor-pointer ' onClick={()=>setEye(!eye)}>
                {eye? <FaEye />:<FaEyeSlash />}
                </span>
                </span>
                <div className='text-white text-[14px] flex justify-between m-1.5 '>
                    <h1>Forgot password?</h1>
                    <NavLink to="/resetpassword" className="hover:text-purple-400 underline">Reset password</NavLink>
                </div>
                
                <div className='py-2'>
                    <button type='submit' className=' tracking-wider w-full cursor-pointer bg-purple-600  py-2 rounded text-white font-bold'>Login</button>
                </div>
                <div className='text-white text-[14px] flex justify-center gap-1.5 mt-1 '>
                    <h1>New to MusiFY?</h1>
                    <NavLink to="/register" className="text-purple-400 hover:underline">Register now</NavLink>
                </div>
            </form>
        </main>
    </section>
  )
}

export default Login;