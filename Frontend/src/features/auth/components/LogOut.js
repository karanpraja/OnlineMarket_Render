import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutUserAsync, selectLoggedInUser } from "../AuthSlice"
import { Navigate } from "react-router-dom"
import { removeUserInfoAsync } from "../../User/UserSlice"
import { dumpCartAsync } from "../../cart/CartSlice"

const LogOut=()=>{
    const userToken=useSelector(selectLoggedInUser)
    const dispatch=useDispatch()
    useEffect(()=>{
            console.log(userToken)
            // dispatch(removeUserInfoAsync())
            console.log("LOgOUt")
            dispatch(logoutUserAsync())
            dispatch(removeUserInfoAsync())
            dispatch(dumpCartAsync())
    },[userToken,dispatch])
return(<div>
<Navigate to='/'></Navigate>
</div>)
}
export default LogOut;