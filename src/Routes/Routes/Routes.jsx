import { createBrowserRouter } from "react-router-dom";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import BookServices from "../../Pages/Dashboard/BookServices/BookServices";
import Dashboard from "../../Layout/Dashboard";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import BookingsList from "../../Pages/Dashboard/BookingsList/BookingsList";
import AddReview from "../../Pages/Dashboard/AddReview/AddReview";
import Payment from "../../Pages/Dashboard/Payment/Payment";

const routes=createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signup',
                element:<SignUp/>
            }
        ]
    },
    {
        path:'dashboard',
        element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children:[
            {
                path:'/dashboard/bookservice',
                element:<BookServices/>
            },
            {
                path:'/dashboard/bookingList',
                element:<BookingsList/>
            },
            {
                path:'/dashboard/review',
                element:<AddReview/>
            },
            {
                path:'/dashboard/payment',
                element:<Payment/>
            },
            
        ]
    }
])
export default routes;