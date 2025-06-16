import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdAccountBox } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { MdAddAPhoto } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";



const ProfileSidebar = () => {
  return (
    <section className='text-white basis-[18%] bg-slate-600 font-bold text-[18px] p-2'>
        <nav>
            <ul className='flex flex-col gap-3'>
                <li>
                    <NavLink to="/profile" className="hover:bg-slate-400 p-3 rounded  flex gap-1 items-center">
                        <MdAccountBox className='text-slate-200'/>
                        <h1>MyAccount</h1>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile/addprofile" className="hover:bg-slate-400 p-3  rounded  flex gap-1 items-center">
                        <FaUserEdit className='text-slate-200' />
                        <h1>Add Profile</h1>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile/changepassword" className="hover:bg-slate-400 p-3  rounded  flex gap-1 items-center">
                        <TbLockPassword className='text-slate-200'/>
                        <h1>Change Password</h1>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile/uploadphoto" className="hover:bg-slate-400 p-3  rounded  flex gap-1 items-center">
                        <MdAddAPhoto className='text-slate-200' />
                        <h1>Upload Photo</h1>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile/settings" className="hover:bg-slate-400 p-3  rounded  flex gap-1 items-center">
                        <IoSettingsOutline />
                        <h1>Settings</h1>
                    </NavLink>
                </li>
            </ul>
        </nav>
    </section>
  )
}

export default ProfileSidebar