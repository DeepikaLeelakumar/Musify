import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminContent = () => {
  return (
    <section className='text-white  basis-[82%] '>
        <Outlet/>
    </section>
  )
}

export default AdminContent