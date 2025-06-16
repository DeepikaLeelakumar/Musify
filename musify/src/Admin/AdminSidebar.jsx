import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdAccountBox } from "react-icons/md";




const AdminSidebar = () => {
  return (
    <section className='text-white basis-[18%] bg-slate-600 font-bold h-[130vh] text-[18px] p-2'>
        <nav>
            <ul className='flex flex-col gap-3'>
                <li>
                    <NavLink to="/admin" className="hover:bg-slate-400 p-3 rounded  flex gap-1 items-center">
                        <MdAccountBox className='text-slate-200'/>
                        <h1>Create Album</h1>
                    </NavLink>
                </li>
                
            </ul>
        </nav>
    </section>
  )
}

export default AdminSidebar