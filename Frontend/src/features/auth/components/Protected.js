import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectUserInfo } from "../../User/UserSlice"

const Protected=({children})=>{
const userInfo=useSelector(selectUserInfo)
if(userInfo){
    if(userInfo.role==='admin'){
    <Navigate to='/adminproductlist'></Navigate>
    }
}
if(!userInfo){
    <Navigate to='/login' replace={true}></Navigate>
}
return(children)

}
export default Protected