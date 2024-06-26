import { FaTrash } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import Cookies from "js-cookie"
import axios from "axios";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setOtherUsers, setSelectedUser } from "../redux/userSlice";
import { persistor } from "../redux/store"; // xóa localstorage
import { useState } from "react";




const Sidebar = () => {
    const [active, setActive]= useState(true)
    const {otherUsers,selectedUser} = useSelector(store=>store.user);
    const [search, setSearch] = useState("")
    const dispatch= useDispatch()
    const Navigate= useNavigate()
    const handlerLogout = async () => {
        try {
            const userData = Cookies.get('userData');
          
            const token = userData ? JSON.parse(userData).token : '';
            const res = await axios.get('https://chat-app-iota-blue.vercel.app/api/user', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            console.log(res.data);
            toast.success("Logout successful!")
            Cookies.remove('userData')
            dispatch(setLogout())
            // Xóa localStorage được quản lý bởi redux-persist
            persistor.purge();
            Navigate("/login")
        } catch (error) {
            console.log(error)
        }
     
    }
    const handlerSearch = (e) => {
        e.preventDefault();
        setActive(!active)
        const searchUser= otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()))
        console.log(searchUser)
        if(searchUser) {
            dispatch((setSelectedUser(searchUser)))
        }
        else{
            toast.error("User not found!")
        }
    }

    const toggleActive = () => {
        if (active) {
            handlerSearch(new Event('submit'));
        } else {
            setSearch("");
        }
        setActive(!active);
    };
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form onSubmit={handlerSearch} action="" className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='input input-bordered rounded-md' type="text"
                    placeholder='Search...'
                />
                <button type='button' onClick={toggleActive} className='btn bg-zinc-700 text-white'>
                    {active? <BiSearchAlt2  className='w-6 h-6 outline-none' /> : <FaTrash  className="w-6 h-6 outline-none"/>}
                </button>
            </form>
            <div className="divider px-3"></div>
            <OtherUsers />
            <div className='mt-2'>
                <button onClick={handlerLogout} className='btn btn-sm'>Logout</button>
            </div>
        </div>
    )
}

export default Sidebar