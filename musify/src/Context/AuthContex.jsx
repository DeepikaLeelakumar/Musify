import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { createContext, useState } from 'react'
import toast from 'react-hot-toast'
import { _Auth } from '../Backend/Firebase'

export let MyGarage = createContext();

const AuthContex = ({children}) => {

  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);

    let [authuser,setAuthUser] = useState(null)


    onAuthStateChanged(_Auth,(userInfo)=>{
    if(userInfo.emailVerified === true){
      setAuthUser(userInfo)
    }
    else{
      setAuthUser(null)
    }
  })

  async function logout(){
    await signOut(_Auth)
    setAuthUser(null)
    toast.success("you've logged out")
    window.location.assign("/")
  }
  return (
    <MyGarage.Provider value={{authuser,logout,songs,setSongs,isPlaying,setIsPlaying,currentSongIndex,setCurrentSongIndex}}>
        {children}
    </MyGarage.Provider>
  )
}

export default AuthContex