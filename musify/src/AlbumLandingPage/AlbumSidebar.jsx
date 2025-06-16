import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdAccountBox } from "react-icons/md";



const AlbumSidebar = () => {
  return (
    <section className='text-white basis-[18%] bg-slate-600 font-bold text-[18px] p-2  shadow'>
        <nav>
            <ul className='flex flex-col gap-3'>
                <li>
                    <NavLink to="/" className="hover:bg-slate-400 p-3 rounded  flex gap-1 items-center">
                        <MdAccountBox className='text-slate-200'/>
                        <h1>Albums</h1>
                    </NavLink>
                </li>
                
            </ul>
        </nav>
    </section>
  )
}

export default AlbumSidebar