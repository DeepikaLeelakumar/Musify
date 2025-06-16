import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminContent from './AdminContent'

const AdminContainer = () => {
  return (
    <section className='w-full h-[calc(141vh-70px)] bg-slate-800 flex'>
        <AdminSidebar/>
        <AdminContent/>

    </section>
  )
}

export default AdminContainer