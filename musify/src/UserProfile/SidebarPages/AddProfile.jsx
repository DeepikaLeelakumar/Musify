import React, { useContext, useState } from 'react'
import { MyGarage } from '../../Context/AuthContex'
import { _DB } from '../../Backend/Firebase'
import { doc, setDoc } from 'firebase/firestore'

const AddProfile = () => {

  let {authuser} = useContext(MyGarage)
  let {uid,email,photoURL,displayName} = authuser || ""
  
    let [data,setData] = useState({
        firstname:"",
        lastname:"",
        dob:"",
        gender:"",
        phone:"",
        address:"",
        age:"",
        language:"",
        state:"",
        role:"user"
      })
    
      let {firstname,lastname,dob,gender,phone,address,age,language,state,role} = data

      let obj = {firstname,lastname,dob,gender,phone,address,age,language,state}
    //try and catch use
      function handleChange(e){
        setData({...data,[e.target.name]:e.target.value})
      }
      async function handleSubmit(e){
        e.preventDefault()
        console.log(data)
        setData({
        firstname:"",
        lastname:"",
        dob:"",
        gender:"",
        phone:"",
        address:"",
        age:"",
        language:"",
        state:""
        })
        try{
          let user_profile_collection = doc(_DB,"user_profile",uid)
          await setDoc(user_profile_collection,{
            email,
            displayName,
            uid,
            photoURL,
            ...obj,
            role
          })
          console.log(obj)
          
        }
        catch(e){
          console.log(err.code)
        }
      }
      return (
        <section className='w-full flex flex-col justify-center items-center'>
        <header>
          <h1 className=' font-bold text-3xl text-purple-400 tracking-wider mt-3 mb-4'>Update Profile</h1>
        </header>
        <form onSubmit={handleSubmit} className='w-[85%] bg-slate-500 flex flex-col gap-3 p-4 rounded-md'>
          <div className='w-full px-6 py-5 bg-slate-700 flex rounded-md justify-between'>
            <div className='flex flex-col'>
              <label htmlFor="firstname" className='text-white font-bold tracking-wider'>FirstName </label>
              <input id='firstname' name='firstname' value={firstname} onChange={handleChange} type="text" className='border-1   outline-0 w-[265px] py-1.5 px-1 rounded mt-1' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="lastname" className='text-white font-bold tracking-wider'>LastName </label>
              <input id='lastname' name='lastname' value={lastname} onChange={handleChange} type="text" className='border-1 outline-0 w-[265px] py-1.5 px-1 rounded mt-1' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="dob" className='text-white font-bold tracking-wider'>DOB </label>
              <input id='dob' name='dob' value={dob} onChange={handleChange} type="date" className='border-1  outline-0 w-[265px] py-1.5 px-1 rounded mt-1' />
            </div>
          </div>
    
          <div className='w-full p-6 py-4.5  bg-slate-700 flex rounded-md justify-between'>
            <div>
              <label className='block font-bold  mb-3 text-[17px] tracking-wider'>Gender</label>
              <div className='flex w-full gap-25'>
    
                <div>
                  <input name='gender' value="Male" checked={gender === "Male"} onChange={handleChange} type="radio" id='Male' className='size-3.5 accent-purple-400' />
                  <label htmlFor="Male"  className='font-bold tracking-wider'> Male</label>
                </div>
    
                <div>
                  <input name='gender' value="Female" onChange={handleChange} checked={gender === "Female"} type="radio" id='Female' className='size-3.5 accent-purple-400' />
                  <label htmlFor="Female"  className='font-bold tracking-wider'> Female</label>
                </div>
                
                <div>
                  <input name='gender' value="Other" onChange={handleChange} checked={gender === "Other"} type="radio" id='others' className=' size-3.5 accent-purple-400' />
                  <label htmlFor="others"  className='font-bold tracking-wider'> Others</label>
                </div>
    
              </div>
            </div>
            <div className='flex flex-col' >
              <label htmlFor="phone" className='font-bold tracking-wider'>Phone No</label>
              <input id='phone' name='phone' value={phone} onChange={handleChange} type="tel" className='border-1 outline-0 w-[265px] py-1.5 px-1 rounded mt-1' />
            </div>
          </div>
    
          <div className='w-full px-6 py-2 bg-slate-700 rounded-md pt-3'>
            <label htmlFor="address" className='font-bold tracking-wider'>Address</label>
            <textarea id='address' name='address' value={address} onChange={handleChange} rows="3" type="text" className='border-1 mt-1 outline-none px-1.5 w-full rounded resize-none' ></textarea>
          </div>
    
    
          <div className='w-full px-6 py-4 bg-slate-700 flex rounded-md justify-between'>
            <div className='flex flex-col'>
              <label htmlFor="age" className='font-bold tracking-wider '>Age</label>
              <input id='age' name='age' value={age} onChange={handleChange} type="number" min="0" max="120"  className='border-1   outline-0 w-[265px] py-1.5 px-1 rounded mt-1' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="language" className='font-bold tracking-wider '>Language</label>
              <input id='language' name='language' value={language} onChange={handleChange} type="text" className='border-1   outline-0 w-[265px] py-1.5 px-1 rounded mt-1' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="state" className='font-bold tracking-wider '>State</label>
              <input id='state' name='state' value={state} onChange={handleChange} type="text" className='border-1   outline-0 w-[265px] py-1.5 px-1 rounded mt-1' />
            </div>
          </div>
    
          <div>
            <button className='bg-purple-500 w-full py-2 rounded font-bold tracking-wider hover:bg-purple-600'>Add prefix</button>
          </div>
    
        </form>
        </section>
  )
}

export default AddProfile