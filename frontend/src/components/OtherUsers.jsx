import { useSelector } from "react-redux"
import useGetOtherUser from "../hooks/useGetOtherUser"
import OtherUser from "./OtherUser"
const OtherUsers = () => {
    useGetOtherUser()
    const {otherUsers}= useSelector(store=>store.user)
    //console.log(otherUsers)
    if(!otherUsers) return;
    
    return (
        <div className='overflow-auto flex-1'>
          {otherUsers?.map((user)=>{
            return <OtherUser key={user._id} user={user} />
          })}
        </div>
    )
}

export default OtherUsers