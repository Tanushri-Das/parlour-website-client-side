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
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import MakeAdmin from "../../Pages/Dashboard/MakeAdmin/MakeAdmin";
import AddService from "../../Pages/Dashboard/AddService/AddService";
import AdminRoute from "../AdminRoute/AdminRoute";
import ManageServices from "../../Pages/Dashboard/ManageServices/ManageServices";
import OrderList from "../../Pages/Dashboard/OrderList/OrderList";

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
            // {
            //     path:'/dashboard/payment',
            //     element:<Payment/>
            // },
            {
                path:'/dashboard/payment/:id',
                element:<Payment></Payment>,
                loader:({params})=>fetch(`https://parlour-website-server-side.vercel.app/bookings/${params.id}`)
               
            },
            
            {
                path:'/dashboard/orderList',
                element:<AdminRoute><OrderList/></AdminRoute>
            },
            {
                path:'/dashboard/allusers',
                element:<AdminRoute><AllUsers/></AdminRoute>
            },
            {
                path:'/dashboard/makeAdmin',
                element:<AdminRoute><MakeAdmin/></AdminRoute>
            },
            {
                path:'/dashboard/addService',
                element:<AdminRoute><AddService/></AdminRoute>
            },
            {
                path:'/dashboard/manageServices',
                element:<AdminRoute><ManageServices/></AdminRoute>
            },
            
        ]
    }
])
export default routes;