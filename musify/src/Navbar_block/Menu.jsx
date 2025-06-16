import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { _Auth, _DB } from '../Backend/Firebase'
import { MyGarage } from '../Context/AuthContex'
import { doc, onSnapshot } from 'firebase/firestore'

const Menu = () => {
  let {authuser,logout} = useContext(MyGarage)
  let [profile,setProfile] = useState()
  
     let uid = authuser?.uid
    
    useEffect(()=>{
      function fetchData(){
        if(uid){
          let user_profile_collection = doc(_DB,"user_profile",uid)
          onSnapshot(user_profile_collection,(userinfo)=>{
            if(userinfo.exists()){
              setProfile(userinfo.data())
              // console.log(profile)
            }
            else{
              console.log("userinfo not found")
              setProfile(null)
            }
          })
    
        }else{
          console.log("UserId not found")
        }
      }
      fetchData()
    },[uid])
    console.log(profile)
  function AuthenticatedUser(){
    return(
      <>
      <li>
        {
          profile?.role == "admin" && <>
                <NavLink to="/admin" className='px-4 py-2 rounded-md hover:bg-purple-600'>Admin</NavLink>
          </>
        }
      </li>
      <li >
        <NavLink to="/profile" className='px-4 py-2 rounded-md hover:bg-purple-600 flex items-center gap-2 h-10'>
        
        <h1>{authuser.displayName}</h1>
        <img src={authuser?.photoURL} alt='p'  className='rounded-full w-[40px] h-[40px]'/>
        
        </NavLink>
        </li>
        <li >
        <button className='px-4 py-2 rounded-md hover:bg-purple-600' onClick={logout}>Logout</button>
        </li>
      </>
    )
  }
  function AnonymousUser(){
    return(
      <>
        <li >
        <NavLink to="/login" className='px-4 py-2 rounded-md hover:bg-purple-600'>Login</NavLink>
        </li>
        <li >
        <NavLink to="/register" className='px-4 py-2 rounded-md hover:bg-purple-600'>Register</NavLink>
        </li>
      </>
    )
  }
  return (
    <ul className='flex gap-5 text-[18px] items-center'>
        <li >
         <NavLink to="/" className='px-4 py-2 rounded-md hover:bg-purple-600'>Home</NavLink>
        </li>
        {authuser? <AuthenticatedUser/> : <AnonymousUser/>}
    </ul>
  )
}

export default Menu