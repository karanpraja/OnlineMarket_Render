import UserOrders from "../features/User/components/UserOrders"
import Navbar from "../features/navbar/Navbar"

const UserOrderPage=()=>{
 const dashboard="User Orders"
return(<Navbar data={dashboard}>
<UserOrders />
</Navbar>)
}
export default UserOrderPage