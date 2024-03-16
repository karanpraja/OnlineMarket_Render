import UserProfile from "../features/User/components/UserProfile"
import Navbar from "../features/navbar/Navbar"

const UserProfilePage=()=>{
return(
    <Navbar data={'User Profile'}>
        <UserProfile />
    </Navbar>
)
}
export default UserProfilePage