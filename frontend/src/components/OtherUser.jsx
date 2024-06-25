import { useDispatch,useSelector } from "react-redux"
import { setSelectedUser } from "../redux/userSlice"
const OtherUser = ({user}) => {
    const {selectedUser, onlineUsers} = useSelector(store=>store.user);
    const isOnline = onlineUsers?.includes(user._id);
    console.log(isOnline,user._id)
    const dispatch= useDispatch()
    const handlerSelectedUser= ()=>{
        // console.log(user,1)
        dispatch(setSelectedUser(user))
    }

    return (
        <>
            <div onClick={handlerSelectedUser} className={` ${selectedUser?._id === user?._id ? 'bg-zinc-200 text-black' : 'text-white'} flex gap-2 hover:text-black items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}>
                <div className={`avata ${isOnline ? 'online' : ''}`}>
                    <div className='w-12 rounded-full'>
                        <img src={user.profilePic} alt="user-profile" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 '>
                        <p>{user.fullName}</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </>
    )
}

export default OtherUser