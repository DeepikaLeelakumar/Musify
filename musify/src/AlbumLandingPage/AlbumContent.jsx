import React from 'react'
import { Outlet } from 'react-router-dom'

const AlbumContent = () => {
  return (
    <section className='text-white basis-[82%] '>
        <Outlet/>
    </section>
  )
}

export default AlbumContent