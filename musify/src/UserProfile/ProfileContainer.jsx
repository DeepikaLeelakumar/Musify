import React from 'react'
import ProfileSidebar from './ProfileSidebar'
import ProfileContent from './ProfileContent'

const ProfileContainer = () => {
  return (
    <section className='w-full h-[calc(100vh-70px)] bg-slate-800 flex'>
        <ProfileSidebar/>
        <ProfileContent/>

    </section>
  )
}

export default ProfileContainer