import React, { useContext, useRef, useState } from 'react'
import { _DB } from '../../Backend/Firebase'
import { addDoc, collection } from 'firebase/firestore'
import toast from 'react-hot-toast'

const CreateAlbum = () => {

    const formRef = useRef()

  let [album, setAlbum] = useState({
    albumtitle: "",
    albumdate: "",
    albumstarcast: "",
    albumdesc: "",
    albumlang: "",
    albumtype: "",
    albumThumnails: null,
    songsCounts: "",
    song:[]

  })

  let {
    albumtitle,
    albumdate,
    albumstarcast,
    albumdesc,
    albumlang,
    albumtype,
    albumThumnails,
    songsCounts,
    song

  } = album

  //!details about each song in a album
  let [songdetails, setSongDetails] = useState([
    {
      songtitle: "",
      songsingers: "",
      songdirector: "",
      songthumnail: null,
      songaudio: null,
    }
  ])

  function handleChange(e) {
    setAlbum({ ...album, [e.target.name]: e.target.value })
  }

  let result = '';

  async function handleSubmit(e) {
    e.preventDefault()
    // console.log(album)

    try {
      if (albumThumnails) {


        let albumdata = new FormData
        albumdata.append("file", albumThumnails)
        albumdata.append("upload_preset", "musify_music")
        albumdata.append("cloud_name", "dcf87nfa5")

        let response = await fetch("https://api.cloudinary.com/v1_1/dcf87nfa5/image/upload", {
          method: "POST",
          body: albumdata
        })
        result = await response.json()
        // let imgurl = result.url
        // console.log(result)
        // console.log(imgurl)
      }

      let songData = [] //! to store all the data both thumbnail and audio data(songObjectData)
      
      //!waits
      // {
        //   songdetails.map(async (song, index) => {
          
          //     if (song.songthumnail) {
            
          //       //!step1 : convert into binary
          //       let songthumnailData = new FormData
          //       //!to make the referece about the data to be sent and where should be stored and who should have
          //       songthumnailData.append("file", song.songthumnail)
          //       songthumnailData.append("upload_preset", "musify_music")
          //       songthumnailData.append("cloud_name", "dcf87nfa5")
          
          //       //!to post the data into cloudinary by using the reference of where it should be posted
          //       let songresponse = await fetch("https://api.cloudinary.com/v1_1/dcf87nfa5/image/upload", {
            //         method: "POST",
            //         body: songthumnailData
            //       })
            
            //       let songresult = await songresponse.json()
            //       songthumnailresult = songresult.url
            //       // console.log(songthumnailresult)
            
            //     }
            
            //     if (song.songaudio) {
              //       //!step1 : convert into binary
              
              //       let songaudioData = new FormData
              //       songaudioData.append("file", song.songaudio)
              //       songaudioData.append("upload_preset", "musify_music")
              //       songaudioData.append("cloud_name", "dcf87nfa5")
              
              //       let songresponse = await fetch("https://api.cloudinary.com/v1_1/dcf87nfa5/upload", {
                //         method: "POST",
      //         body: songaudioData
      //       })
      //       let songresult = await songresponse.json()
      //       let songaudioresult = songresult.url
      //       // console.log(songresult)
      //       // console.log(songaudioresult)
      
      
      //        songObjectData = {
        //         id: songresult.asset_id,
        //         url: songresult.url,
        //         duration: (() => {
          //           const seconds = Math.floor(songresult.duration); //! taking only the seconds frm duration such that after decimal it is millisecond so using Math.floor 
          //           const minutes = Math.floor(seconds / 60);//! convert the seconds into minutes
          //           const remainingSeconds = seconds % 60;
          //           return `${minutes}:${remainingSeconds
          //             .toString()
          //             .padStart(2, "0")}`;//! ?
          //         })(),
          //         size: (songresult.bytes / (1024 * 1024)).toFixed(2) + " MB", //!1KB = 1024bytes such that 1MB = (1024)^2 bytes
          //       }
          //     }
          
      //     //!CONTAINS ALL THE DATA (SONG)
      //     songData.push({
        //       ...songObjectData,
        //       songtitle : song.songtitle,
        //       songdirector : song.songdirector,
      //       songsingers : song.songsingers,
      //       songthumnail : songthumnailresult
      
      //     })
      
      //   })
      // }
      
      await Promise.all(
        songdetails.map(async (song, index) => {
          
          let songObjectData = {} //! to retrive required fields from the audio data
          let songthumnailresult = ""//! to send to the firebase we need url of the thumbnail so taking the url data
         
          console.log(song);//!*test if it comes
          
          if (song.songthumnail) {
            
            //!step1 : convert into binary
                let songthumnailData = new FormData
                //!to make the referece about the data to be sent and where should be stored and who should have
                songthumnailData.append("file", song.songthumnail)
                songthumnailData.append("upload_preset", "musify_music")
                songthumnailData.append("cloud_name", "dcf87nfa5")
    
                //!to post the data into cloudinary by using the reference of where it should be posted
                let songresponse = await fetch("https://api.cloudinary.com/v1_1/dcf87nfa5/image/upload", {
                  method: "POST",
                  body: songthumnailData
                })
    
                let songresult = await songresponse.json()
                songthumnailresult = songresult.url
                // console.log(songthumnailresult)
    
              }
    
              if (song.songaudio) {
                //!step1 : convert into binary
    
                let songaudioData = new FormData
                songaudioData.append("file", song.songaudio)
                songaudioData.append("upload_preset", "musify_music")
                songaudioData.append("cloud_name", "dcf87nfa5")
    
                let songresponse = await fetch("https://api.cloudinary.com/v1_1/dcf87nfa5/upload", {
                  method: "POST",
                  body: songaudioData
                })
                let songresult = await songresponse.json()
                let songaudioresult = songresult.url
                // console.log(songresult)
                // console.log(songaudioresult)
    
    
                 songObjectData = {
                  id: songresult.asset_id,
                  url: songresult.url,
                  duration: (() => {
                    const seconds = Math.floor(songresult.duration); //! taking only the seconds frm duration such that after decimal it is millisecond so using Math.floor 
                    const minutes = Math.floor(seconds / 60);//! convert the seconds into minutes
                    const remainingSeconds = seconds % 60;
                    return `${minutes}:${remainingSeconds
                      .toString()
                      .padStart(2, "0")}`;//! ?
                  })(),
                  size: (songresult.bytes / (1024 * 1024)).toFixed(2) + " MB", //!1KB = 1024bytes such that 1MB = (1024)^2 bytes
                }
              }
    
              //!CONTAINS ALL THE DATA (SONG)
              songData.push({
                ...songObjectData,
                songtitle : song.songtitle,
                songdirector : song.songdirector,
                songsingers : song.songsingers,
                songthumnail : songthumnailresult
    
              })
    
            })
      )
      let payload = {
        ...album,
        song : songData,
        albumThumnails:result.url||""
      }

      let albumCollection = collection(_DB,"musify_music")
      await addDoc(albumCollection,payload)
      toast.success("Album created successfully😎")

      console.log(payload)
    } catch (err) {
      console.log(err.message)
    }

    setAlbum({
      albumtitle: "",
      albumdate: "",
      albumstarcast: "",
      albumdesc: "",
      albumlang: "",
      albumtype: "",
      albumThumnails: "",
      songsCounts: ""
    })

    setSongDetails([{
      
        songtitle: "",
        songsingers: "",
        songdirector: "",
        songthumnail: null,
        songaudio: null,
      
    }])

  }
  function handlethumnailChange(e) {
    let file = e.target.files[0]
    let fileurl = URL.createObjectURL(file)
    setAlbum({ ...album, albumThumnails: file })
    // console.log(file)
    // let fileurl = URL.createObjectURL(file)
    // console.log(fileurl)

  }

  function handleSongChange(e, index) {
    let name = e.target.name
    let value = e.target.value
    let newSongDetails = [...songdetails]
    newSongDetails[index][name] = value
    setSongDetails(newSongDetails)
  }

  function handleSongFileChange(e, index) {
    let file = e.target.files[0]
    let name = e.target.name
    // console.log(name)
    // console.log((file))
    let newSongFile = [...songdetails]
    newSongFile[index][name] = file
    setSongDetails(newSongFile)
  }
  // console.log(songdetails)

  function AddSongs(){
    setSongDetails([
      ...songdetails,{
      songtitle: "",
      songsingers: "",
      songdirector: "",
      songthumnail: null,
      songaudio: null,
      }
    ])
  }

  function removeSongs(index){
    let newSongs = songdetails.filter((song,i)=> index != i)
    setSongDetails(newSongs)
  
  }
  
  return (
    <section className='w-full flex flex-col justify-center items-center '>
      <header>
        <h1 className=' font-bold text-3xl text-purple-400 tracking-wider mt-3 mb-4'>Create Album</h1>
      </header>

      <form onSubmit={handleSubmit} className='w-[85%] bg-slate-500 flex flex-col gap-3 p-4 rounded-md'>
        <div className='w-full px-6 py-3.5 bg-slate-700 flex rounded-md justify-between gap-5'>
          <div className='w-1/3 flex flex-col'>
            <label htmlFor="albumtitle" className='text-white font-bold tracking-wider'>Album Title</label>
            <input id='albumtitle' name='albumtitle' value={albumtitle} onChange={handleChange} type="text" className='border-1   outline-0  py-1.5 px-1 rounded mt-1' />
          </div>
          <div className='w-1/3 flex flex-col'>
            <label htmlFor="albumdate" className='text-white font-bold tracking-wider'>Album Date </label>
            <input id='albumdate' name='albumdate' value={albumdate} onChange={handleChange} type="date" className='border-1 outline-0  py-1.5 px-1 rounded mt-1' />
          </div>
          <div className='w-1/3 flex flex-col'>
            <label htmlFor="albumstarcast" className='text-white font-bold tracking-wider'>Album Starcast </label>
            <input id='albumstarcast' name='albumstarcast' value={albumstarcast} onChange={handleChange} type="text" className='border-1  outline-0  py-1.5 px-1 rounded mt-1' />
          </div>
        </div>

        <div className='w-full px-6 py-3.5 bg-slate-700 flex rounded-md justify-between gap-5'>
          <div className='w-1/3 flex flex-col'>
            <label htmlFor="albumdesc" className='font-bold tracking-wider '>Album Description</label>
            <input id='albumdesc' name='albumdesc' value={albumdesc} onChange={handleChange} type="text" className='border-1  outline-0  py-1.5 px-1 rounded mt-1' />
          </div>
          <div className='w-1/3 flex flex-col'>
            <label htmlFor="albumlang" className='font-bold tracking-wider '>Album language</label>
            <input id='albumlang' name='albumlang' value={albumlang} onChange={handleChange} type="text" className='border-1  outline-0  py-1.5 px-1 rounded mt-1' />
          </div>
          <div className='w-1/3 flex flex-col'>
            <label htmlFor="albumtype" className='font-bold tracking-wider '>Album Type</label>
            <input id='albumtype' name='albumtype' value={albumtype} onChange={handleChange} type="text" className='border-1  outline-0  py-1.5 px-1 rounded mt-1' />
          </div>
        </div>

        <div className='w-full px-6 py-3.5 bg-slate-700 flex rounded-md justify-between gap-5'>
          <div className='w-2/3 flex flex-col'>
            <label htmlFor="albumthumnails" className='font-bold tracking-wider '>Album Thumnails</label>
            <input id='albumthumnails' name='albumthumnails' onChange={handlethumnailChange} type="file" className='border-1  outline-0  py-1 px-1 rounded mt-1  file:px-3 file:p-[3px] file:bg-slate-500 file:rounded-md' />
          </div>

          <div className='w-1/3 flex flex-col'>
            <label htmlFor="albumtype" className='font-bold tracking-wider '>Songs Count</label>
            <input id='albumtype' name='songsCounts' value={songsCounts} onChange={handleChange} type="number" className='border-1  outline-0  py-1.5 px-1 rounded mt-1' />
          </div>
        </div>

        <h1 className='tracking-wider text-white font-bold text-center border-b border-b-slate-400 '>Add song</h1>

        {
          songdetails.map((song, index) => {
            return (
              <section key={index} className='w-full bg-slate-700 p-3.5 text-white rounded-md'>

                <div className='w-full flex gap-5'>
                  <div className='flex flex-col w-1/3'>
                    <label htmlFor="songtitle" className='font-bold tracking-wider'>Song Title:</label>
                    <input type="text" name='songtitle' className='px-3 py-2 border rounded-md border-slate-200 focus:outline-0' value={song.songtitle} id='songtitle' onChange={(e) => handleSongChange(e, index)} />
                  </div>
                  <div className='flex flex-col w-1/3'>
                    <label htmlFor="songsingers" className='font-bold tracking-wider'>Song Singers:</label>
                    <input type="text" name='songsingers' className='px-3 py-2 border rounded-md border-slate-200 focus:outline-0' value={song.songsingers} id='songsingers' onChange={(e) => handleSongChange(e, index)} />
                  </div>
                  <div className='flex flex-col w-1/3'>
                    <label htmlFor="songdirector" className='font-bold tracking-wider'>Song Director:</label>
                    <input type="text" name='songdirector' className='px-3 py-2 border rounded-md border-slate-200 focus:outline-0' value={song.songdirector} id='songdirector' onChange={(e) => handleSongChange(e, index)} />
                  </div>
                </div>

                <div >
                  <div className='w-full flex gap-5 mt-3'>
                    <div className='flex flex-col w-1/2'>
                      <label htmlFor="songthumnail" className='font-bold tracking-wider'>Song Thumnail:</label>
                      <input type="file" accept='image/*' name='songthumnail' className=' px-3 py-2 border rounded-md border-slate-200 focus:outline-0 file:bg-slate-500 file:px-2 file:py-1 file:rounded' id='songthumnail' onChange={(e) => handleSongFileChange(e, index)} />
                    </div>
                    <div className='flex flex-col w-1/2'>
                      <label htmlFor="songaudio" className='font-bold tracking-wider'>Song Audio:</label>
                      <input type="file" accept='audio/*' name='songaudio' className=' px-3 py-2 border rounded-md border-slate-200 focus:outline-0 file:bg-slate-500 file:px-2 file:py-1 file:rounded' id='songaudio' onChange={(e) => handleSongFileChange(e, index)} />
                    </div>
                  </div>
                </div>

              <div className='mt-5 flex justify-between'>
                <button type='button' className='px-3 py-2 bg-purple-600 rounded-md' onClick={AddSongs}>
                  Add Songs
                </button>
                {
                  index>=1 && <button type='button' className='px-3 py-2 bg-red-500 rounded-md' onClick={()=>removeSongs(index)}>
                  Remove Songs
                </button>
                }
              </div>
              </section>
            )
          }
          )
        }

        <div>
          <button className='bg-purple-500 w-full py-2 rounded font-bold tracking-wider hover:bg-purple-600'>Add Album</button>
        </div>
        {/* <div className='w-full p-6 py-4.5  bg-slate-700 flex rounded-md justify-between'>
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
              
    
     */}

      </form>
    </section>
  )
}

export default CreateAlbum