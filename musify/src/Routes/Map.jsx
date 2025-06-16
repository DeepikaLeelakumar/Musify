import { createBrowserRouter } from "react-router-dom";
import Layout from "../Navbar_block/Layout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ResetPassword from "../Pages/ResetPassword";
import ProfileContainer from "../UserProfile/ProfileContainer";
import Myaccount from "../UserProfile/SidebarPages/Myaccount";
import AddProfile from "../UserProfile/SidebarPages/AddProfile";
import ChangePassword from "../UserProfile/SidebarPages/ChangePassword";
import { Settings } from "../UserProfile/SidebarPages/Settings";
import UploadPhoto from "../UserProfile/SidebarPages/UploadPhoto";
import AdminContainer from "../Admin/AdminContainer";
import CreateAlbum from "../Admin/AlbumPages/CreateAlbum";
import AlbumContainer from "../AlbumLandingPage/AlbumContainer";
import Albums from "../AlbumLandingPage/AlbumPages/Albums";
import AlbumDetails from "../AlbumLandingPage/AlbumPages/AlbumDetails";

export let MyMap = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            // {
            //     path:"/",
            //     element:<Home/>
            // },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/register",
                element:<Register/>
            },
            {
                path:"/resetpassword",
                element:<ResetPassword/>
            },
            {
                path:"/profile",
                element:<ProfileContainer/>,
                children:[
                    {
                        index:true,
                        element:<Myaccount/>
                    },
                    {
                        path:"addprofile",
                        element:<AddProfile/>
                    },
                    {
                        path:"changepassword",
                        element:<ChangePassword/>
                    },
                    {
                        path:"settings",
                        element:<Settings/>
                    },
                    {
                        path:"uploadphoto",
                        element:<UploadPhoto/>
                    }
                ]
            },{
                path:"/admin",
                element:<AdminContainer/>,
                children:[{
                    index:true,
                    element:<CreateAlbum/>
                }]
            },{
                path:'/',
                element:<AlbumContainer/>,
                children:[
                    {
                        index:true,
                        element:<Albums/>
                    },{
                        path:"/albumDetails/:albumtitle",
                        element:<AlbumDetails/>
                    }
                ]
            }

        ]
    }
])