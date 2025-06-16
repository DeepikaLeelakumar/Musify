import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
} from "firebase/auth";
import { _Auth } from "../Backend/Firebase";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
    let navigate = useNavigate()
    let [data, setData] = useState({
        username: "",
        useremail: "",
        userpassword: "",
        userconfirmPassword: "",
    });

    let { username, useremail, userpassword, userconfirmPassword } = data;

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (userpassword === userconfirmPassword) {
                //!Used to create user in firebase application and store the useremail and password
                let userData = await createUserWithEmailAndPassword(
                    _Auth,
                    useremail,
                    userpassword,
                );
                //!used to send verification email to the provided email
                sendEmailVerification(userData.user);
                console.log(userData.user);
                toast.success(
                    "verification email has sent to your registered email " +
                        useremail,
                    );
                    //!updating displayName and photoURL
                    updateProfile(userData.user,{
                        displayName:username,
                        photoURL:"https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg"
                    })
                    navigate("/login")
            } else {
                toast.error("Incorrect password");
            }
        } catch (err) {
            toast.error("Error: " + err.code);
        }

        setData({
            username: "",
            useremail: "",
            userpassword: "",
            userconfirmPassword: "",
        });
    }
    let [eye, setEye] = useState(false);
    let [eye2, setEye2] = useState(false);
    //output:{username: 'fefe', useremail: 'rgvrdgvr@rgbr', userpassword: 'vgegved', userconfirmPassword: 'frvbrdb'}
    return (
        <section className="w-full h-[calc(100vh-70px)] bg-slate-800 flex flex-col justify-center items-center">
            <header className="font-bold text-3xl text-purple-400 tracking-wider">
                <h1>Register</h1>
            </header>
            <main>
                <form
                    onSubmit={handleSubmit}
                    className="w-[400px]  bg-slate-900 mt-4 p-5 border-b-2 caret-purple-400"
                >
                    <div className="py-2">
                        <label
                            htmlFor="name"
                            className="text-white font-bold tracking-wider"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            id="name"
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full border text-white border-white  px-3 py-2 rounded focus:outline-0 placeholder:text-white"
                        />
                    </div>
                    <div className="py-2">
                        <label
                            htmlFor="email"
                            className="text-white font-bold tracking-wider"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="useremail"
                            id="email"
                            value={useremail}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full border text-white border-white px-3 py-2 rounded focus:outline-0 placeholder:text-white"
                        />
                    </div>
                    <span className="relative">
                        <div className="py-2">
                            <label
                                htmlFor="password"
                                className="text-white font-bold tracking-wider"
                            >
                                Password
                            </label>
                            <input
                                type={eye ? "text" : "password"}
                                name="userpassword"
                                id="password"
                                autoComplete=""
                                value={userpassword}
                                onChange={handleChange}
                                placeholder="Enter your Password"
                                className="w-full border text-white border-white px-3 py-2 rounded focus:outline-0 placeholder:text-white"
                            />
                        </div>
                        <span
                            className="absolute right-5 top-11 text-purple-400 cursor-pointer "
                            onClick={() => setEye(!eye)}
                        >
                            {eye ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </span>
                    <span className="relative">
                        <div className="py-2">
                            <label
                                htmlFor="confirmPassword"
                                className="text-white font-bold tracking-wider"
                            >
                                Confirm Pasword
                            </label>
                            <input
                                type={eye2 ? "text" : "password"}
                                name="userconfirmPassword"
                                autoComplete=""
                                id="confirmPassword"
                                value={userconfirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                className="w-full border text-white border-white px-3 py-2 focus:outline-0 rounded placeholder:text-white"
                            />
                        </div>
                        <span
                            className="absolute right-5 top-11 text-purple-400 cursor-pointer "
                            onClick={() => setEye2(!eye2)}
                        >
                            {eye2 ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </span>
                    <div className="py-2">
                        <button className="tracking-wider w-full bg-purple-600 cursor-pointer  py-2 rounded text-white font-bold">
                            Register
                        </button>
                    </div>
                    <div className='text-white text-[14px] text-center mt-1 '>
                    <NavLink to="/login" className="hover:text-purple-400 underline">Already have an account?</NavLink>
                </div>
                </form>
            </main>
        </section>
    );
};

export default Register;
