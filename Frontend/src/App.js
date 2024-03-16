import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';

// import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import {  useDispatch, useSelector } from 'react-redux';
import {   checkUserAsync, selectLoggedInUser, selectUserChecked } from './features/auth/AuthSlice';
import { fetchCartItemsByUserIdAsync } from './features/cart/CartSlice';
import OrderPage from './pages/CheckOrderPage';
import { selectProducts } from './features/Products/ProductSlice';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserDataAsync} from './features/User/UserSlice';
// import ForgetPassPage from './pages/ForgetPassPage';
import LogoutPage from './pages/LogoutPage';
import AdminHome from './pages/AdminHome';
import AdminAddProductFormPage from './pages/AddProductPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import { fetchLoggedInUserOrdersAsync } from './features/Order/OrderSlice';
import Stripe from './pages/Stripe';
import ErrorPage from './pages/404Page';

const router = createBrowserRouter([
  {
    path: "/",

    element:    <Home/>    
    },
  {
    path: "login",
    element: <LoginPage/>,
  },
  {
    path: "signup",
    element: <SignUpPage/>,
  },
  {
    path:"cart",
    element:<Protected><CartPage/></Protected>
  },
  {path:'checkout',
  element:<Protected><CheckoutPage/></Protected>
  },
  {path:'productdetail/:id',
  element:<ProductDetailPage/>
  },
  {path:'checkorder/:id',
  element:<OrderPage/>
  },
  {
    path:'userorders',
    element:<UserOrderPage/>
  },
  {
    path:'userprofile',
    element:<UserProfilePage/>
  },
  // {
  //   path:'forgotpassword',
  //   element:<ForgetPassPage/>
  // },
  {
    path:'logout',
    element:<LogoutPage/>
  },
  {
    path:'admin',
    element:<Protected><AdminHome/></Protected>
  },
  {
    path:'admin/adminaddproduct/edit/:id',
    element:<Protected><AdminAddProductFormPage/></Protected>
  },
  {
    path:'admin/adminaddproduct',
    element:<Protected><AdminAddProductFormPage/></Protected>
  },
  {
    path:'admin/adminorders',
    element:<Protected><AdminOrdersPage/></Protected>
  },
  {
    path:'stripecheckout/:id',
    element:<Protected><Stripe/></Protected>
  },
  {
    path:'errorpage',
    element:<ErrorPage/>
  }


]);

function App() {
  console.log({port:process.env.REACT_APP_PORT})
  const userToken=useSelector(selectLoggedInUser)
  console.log(userToken)
  const dispatch=useDispatch()
  const items=useSelector(selectProducts)
  const userChecked=useSelector(selectUserChecked)
  useEffect(()=>{
dispatch(checkUserAsync())
  },[dispatch])
  useEffect(()=>{
    // console.log([userToken[0],'app'])
  //   if(userToken[0]){
  // dispatch(fetchCartItemsByUserIdAsync(userToken[0][0].id))
  //   }
    // const id=4
    // console.log([userToken[0],'app'])
    if(userToken){
      dispatch(fetchLoggedInUserDataAsync())
      dispatch(fetchLoggedInUserOrdersAsync())
      dispatch(fetchCartItemsByUserIdAsync())
    }
    // else{
    //   dispatch(removeUserInfoAsync())
    // }
  // dispatch(loginUserAsync({email:'karan3@gmail.com',password:'Prajapat@2003'}))

    
},[dispatch,userToken,items
  // user
])
  return (
    <div className="App">
      {userChecked&&
      // <Provider template={AlertTemplate} {...options}>
      <RouterProvider router={router}/>
      // </Provider>
      } 
    </div>
  );
}

export default App;
