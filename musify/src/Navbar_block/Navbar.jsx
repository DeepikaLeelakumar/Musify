import React from 'react'
import Logo from './Logo'
import Menu from './Menu'

const Navbar = () => {
  return (
    <nav className='flex h-[70px] bg-slate-950  text-white px-20 justify-between items-center'>
    <Logo/>
    <Menu/>
    </nav>
  )
}

export default Navbar