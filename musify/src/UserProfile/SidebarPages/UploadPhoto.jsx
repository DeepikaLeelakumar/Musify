import { updateProfile } from "firebase/auth";
import React, { useContext, useState } from "react";
import { MyGarage } from "../../Context/AuthContex";
import toast from "react-hot-toast";

const UploadPhoto = () => {
  let {authuser} = useContext(MyGarage)

    let [photofile, setphotofile] = useState();

    let [photoPreview,setphotoPreview] = useState()

    function handleChangefile(e){
        let file = e.target.files[0]//!taking file only{not length}
        setphotofile(file)
        console.log(file)

        let data = URL.createObjectURL(file)
        setphotoPreview(data)
        
        
    }
    async function handleSubmit(e){
       e.preventDefault()

       let data = new FormData;
       data.append("file",photofile)
       data.append("upload_preset","musify_music")
       data.append("cloud_name","dcf87nfa5")

       let response = await fetch("https://api.cloudinary.com/v1_1/dcf87nfa5/image/upload",{
        method:"POST",
        body:data
       })

       let result = await response.json()
       let imgurl = result.url
       console.log(imgurl)

       await updateProfile(authuser,{
        photoURL:imgurl
       })

      //  toast.success("uploaded successfully")
       window.location.assign("/profile/myaccount")
    }
    return (
        <section className="w-full h-[calc(100vh-70px)] bg-slate-800 flex flex-col justify-center items-center">
            <header className="font-bold text-3xl text-purple-400 tracking-wider">
                <h1>UploadPhoto</h1>
            </header>
            <main>
                <form
                    onSubmit={handleSubmit}
                    className="w-[400px]  bg-slate-900 mt-4 p-5 caret-purple-400">
                    <div className="py-2">
                        <label
                            htmlFor="upload"
                            className="text-white font-bold tracking-wider">
                            Upload your Photo here!
                        </label>
                        
                        {
                          photoPreview && <img src={photoPreview} alt="" className="rounded-full w-[140px] h-[140px] m-auto p-2" />
                        }

                        <input
                            type="file"
                            name="upload"
                            id="upload"
                            onChange={handleChangefile}
                            className="w-full border text-white border-white  px-3 py-2 rounded focus:outline-0 placeholder:text-white file:px-3 file:py-1 file:bg-slate-500 file:rounded"/>
                    </div>
                    <div className="py-2">
                        <button
                            type="submit"
                            className=" tracking-wider w-full bg-purple-600  py-2 rounded text-white font-bold">
                            Upload
                        </button>
                    </div>
                  
                </form>
            </main>
        </section>
    );
};

export default UploadPhoto;
