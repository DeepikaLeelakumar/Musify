import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { MyGarage } from "../../Context/AuthContex";

const AlbumDetails = () => {
  let {songs:sg,setSongs,isPlaying,setIsPlaying,currentSongIndex,setCurrentSongIndex} = useContext(MyGarage)
    
  let location = useLocation();
  let albumData = location?.state;

  console.log(albumData);

  let songs = albumData?.song || [];

  console.log(songs);

  function handleSongclick(index){
    setSongs(songs)
    setCurrentSongIndex(index)
    if(currentSongIndex === index){
        setIsPlaying(!isPlaying)
    }
    else{
        setIsPlaying(true)
    }
  }
  //!format duration (new to learn)

  return (
    <section className="text-white w-full h-min-[calc(100vh-70px)]   flex flex-col justify-center items-center pt-10 mb-[100px]">
      <article className="w-[90%] h-[400px] flex bg-gray-900">
        <aside className="basis-[30%] h-full p-5">
          <img
            src={albumData?.albumThumnails}
            alt=""
            className="w-full h-full object-cover rounded-md"
          />
        </aside>
        <aside className="basis-[70%] ">
          <h1 className="text-5xl font-bold py-3 tracking-wider">
            {albumData?.albumtitle}
          </h1>
          <p className="gap-2">
            <span className="font-semibold text-gray-400">Description:</span>
            <span className="ml-1">{albumData?.albumdesc}</span>
          </p>
          <p className="gap-2">
            <span className="font-semibold text-gray-400">Language:</span>
            <span className="ml-1">{albumData?.albumlang}</span>
          </p>
          <p className="gap-2">
            <span className="font-semibold text-gray-400">Release Date:</span>
            <span className="ml-1">{albumData?.albumdate}</span>
          </p>
          <p className=" gap-2">
            <span className="font-semibold text-gray-400">Starcast:</span>
            <span className="ml-1">{albumData?.albumstarcast}</span>
          </p>
          {/* <p className="gap-2">
            <span className="font-semibold text-gray-300">Movie Director:</span>
            <span className="">{albumData?.songdirector}</span>
          </p> */}
          <p className="gap-2">
            <span className="font-semibold text-gray-400">
              Number of Tracks:
            </span>
            <span className="ml-1">{albumData?.songsCounts}</span>
          </p>
        </aside>
      </article>
      {/* w-[90%] border mt-4 mb-8 */}
      <main className={`w-[90%] border mt-4 mb-8 ${currentSongIndex !== null && "mb-[120px]"}`} >
        <h1 className="text-2xl font-semibold py-3 px-3">Songs Collection</h1>
        <table className="bg-gray-900 w-full">
          <thead>
            <tr className="bg-gray-900">
              <th className="p-2">Track No</th>
              <th className="p-2">Song Thumbnail</th>
              <th className="p-2">Song Name</th>
              <th className="p-2">Song Singers</th>
              <th className="p-2">Song Music Director</th>
              <th className="p-2">Song Duration</th>
              <th className="p-2">Song Size</th>
            </tr>
          </thead>
          <tbody>
            {songs.length > 0 ? (
              songs.map((song, index) => (
                <tr
                  onClick={() => handleSongclick(index)}
                  key={index}
                  className=" space-y-2  border-t-1 border-gray-600 hover:ring-[1px] transition-all duration-100 "
                >
                  <td className="text-center">{index + 1}</td>
                  <td className="p-2 flex justify-center items-center">
                    <img
                      src={song?.songthumnail}
                      alt={song?.songtitle}
                      className=" w-[70px]  rounded"
                    />
                  </td>
                  <td className="text-center p-2">{song?.songtitle}</td>
                  <td className="text-center p-2">{song?.songsingers}</td>
                  <td className="text-center p-2">
                    {song?.songdirector}
                  </td>
                  <td className="text-center p-2">{song?.duration}</td>
                  <td className="text-center p-2">{song?.size}</td>
                </tr>
              ))
            ) : (
              <p>Songs collection not found</p>
            )}
          </tbody>
          <tfoot></tfoot>
        </table>
      </main>
    </section>
  );
};

export default AlbumDetails;