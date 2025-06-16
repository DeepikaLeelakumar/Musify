import React, { use, useContext, useEffect, useState } from 'react'
import { MyGarage } from '../../Context/AuthContex'
import { LuUserRoundX } from "react-icons/lu";
import { NavLink } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { _DB } from '../../Backend/Firebase';


const Myaccount = () => {
  let {authuser} = useContext(MyGarage) 
  // console.log(authuser)

  //or let {uid} = authuser || "" to avoid the uid to be null
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
  
  return (
    <section className='h-full w-full flex flex-col items-center  '>
       <header className='w-[65%] bg-slate-900 h-38 mt-10 relative rounded-t-md'>
        <div>
          <div className='flex justify-center'>
            <img src={authuser?.photoURL} alt="" className='rounded-full w-[130px] h-[120px] absolute top-[-25px] '/>
          </div>
          <div className='text-white mt-[110px] text-center leading-4 font-bold'>
            <h1 >{authuser?.displayName}</h1>
            <h1 >{authuser?.email}</h1>

          </div>
        </div>
       </header>
       <main className='w-[65%] bg-slate-950 rounded-b-md'>
       
        {profile?( 
        <>
        <section className='w-full p-5 '>
            <div className='flex gap-7 pt-5'>
              
              <div className='flex  w-[50%] px-3 py-3 rounded-md gap-2 items-center border'>
                <span>
                  <h1 className='font-bold text-xl'>FullName: </h1>
                </span>
                <span className='mt-1'>{profile?.firstname}</span>
                <span className='mt-1'>{profile?.lastname}</span>
              </div>
              <div className='flex  w-[50%] px-3 py-3 rounded-md gap-2 items-center border'>
                <span>
                  <h1 className='font-bold text-xl'>DOB: </h1>
                </span>
                <span className='mt-1'>{profile?.dob}</span>
              </div>
  
            </div>

            <div className='flex gap-7 pt-10'>
              <div className='flex  w-[50%] px-3 py-3  rounded-md gap-2 items-center border'>
                <span>
                  <h1 className='font-bold text-xl'>Gender: </h1>
                </span>
                <span className='mt-1'>{profile?.gender}</span>
              </div>
              <div className='flex  w-[50%] px-3 py-3 rounded-md gap-2 items-center border'>
                <span>
                  <h1 className='font-bold text-xl'>Phone No: </h1>
                </span>
                <span className='mt-1'>{profile?.phone}</span>
              </div>
            </div>

            <div className='flex gap-7 pt-10'>
              <div className='flex  w-[50%] px-3 py-3  rounded-md gap-2 items-center border'>
                <span>
                  <h1 className='font-bold text-xl'>Age: </h1>
                </span>
                <span className='mt-1'>{profile?.age}</span>
              </div>
              <div className='flex  w-[50%] px-3 py-3 rounded-md gap-2 items-center border'>
                <span>
                  <h1 className='font-bold text-xl'>Address: </h1>
                </span>
                <span className='mt-1'>{profile?.address}</span>
              </div>
            </div>
            
            <div className='flex gap-7 pt-10'>
              <div className='flex  w-[50%] px-3 py-3  rounded-md gap-2 items-center border'>
                <span>
                  <h1 className='font-bold text-xl'>Language: </h1>
                </span>
                <span className='mt-1'>{profile?.language}</span>
              </div>
              <div className='flex  w-[50%] px-3 py-3 rounded-md gap-2 items-center border'>
                <span>
                  <h1 className='font-bold text-xl'>State: </h1>
                </span>
                <span className='mt-1'>{profile?.state}</span>
              </div>
            </div>
        </section>
        </>):(
        <>
          <div className='flex items-center flex-col p-5'>
          <h2>User Information Not Updated</h2>
          <div className='text-red-600 text-[200px] font-thin'>
            <LuUserRoundX />
          </div>
        <NavLink to="/profile/addprofile"><button className='px-4 py-2 mt-4 mr-6 bg-slate-500 rounded-md'>Add Details</button></NavLink>
        </div>
        </>)}
       </main>
    </section>
  )
}

export default Myaccount