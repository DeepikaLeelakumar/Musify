import React from 'react'
import { Outlet } from 'react-router-dom'

const ProfileContent = () => {
  return (
    <section className='text-white h-full basis-[82%] '>
        <Outlet/>
    </section>
  )
}

export default ProfileContent