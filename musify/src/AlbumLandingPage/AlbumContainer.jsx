import React, { useContext } from 'react'
import AlbumSidebar from './AlbumSidebar'
import AlbumContent from './AlbumContent'
import { MyGarage } from '../Context/AuthContex'
import CustomAudioPlayer from 'react-pro-audio-player';





const AlbumContainer = () => {
    let {songs,setSongs,isPlaying,setIsPlaying,currentSongIndex,setCurrentSongIndex} = useContext(MyGarage)
  return (
    <>
    <section className='w-full h-[calc(152vh-70px)] bg-slate-800 flex'>
    <AlbumSidebar/>
    <AlbumContent/>
    </section>
    <div>

    </div>
    
    {currentSongIndex !== null && (
        <CustomAudioPlayer
          songs={songs}
          isPlaying={isPlaying}
          currentSongIndex={currentSongIndex}
          onPlayPauseChange={setIsPlaying}
          onSongChange={setCurrentSongIndex}
          songUrlKey="url"
          songNameKey="title"
          songThumbnailKey="thumbnail" 
          songSingerKey="singer"
        />
      )}
    </>
  )
}

export default AlbumContainer