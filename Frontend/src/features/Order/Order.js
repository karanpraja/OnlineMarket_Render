import { useDispatch, useSelector } from "react-redux"
import {  selectOrderStatus } from "./OrderSlice"
import { Link ,useParams} from "react-router-dom"
import { useEffect } from "react"
import { resetCartAsync } from "../cart/CartSlice"

const  OrderPage=()=>{
let orderStatus=useSelector(selectOrderStatus)
const params=useParams()
const id=params.id
console.log({orderstatus:orderStatus})
const dispatch=useDispatch()
// const resetMessage=useSelector(selectOrderStatus)
console.log(orderStatus)

useEffect(()=>{
  console.log("handleReset")
  dispatch(resetCartAsync())
},[dispatch])
return(
    <>
{/* {!userChecked&&<Navigate to='/'></Navigate>} */}
 {id&&<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">Order Status</p>
      {id&&<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order placed Successfully </h1>}

        {id&&<p className="mt-6 text-base leading-7 text-gray-600">Your order id is:{id}</p>}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
          <p  className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </p>
        </div>
      </div>
    </main>}
</>
)
}
export default OrderPage