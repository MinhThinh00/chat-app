import { useState } from "react"
import {IoSend} from "react-icons/io5"
import Cookies from "js-cookie"
import axios from "axios"
import { useSelector,useDispatch } from "react-redux"
import { setMessages } from "../redux/messageSlice"
const SendInput = () => {
    const dispatch= useDispatch() 
    const {selectedUser}= useSelector(store=>store.user)
    const {messages} = useSelector(store=>store.message)
     const [message,setMessage]= useState("")
     const handlerSubmit =async (e) => {
        e.preventDefault()
        const userData = Cookies.get('userData');
        const token = userData ? JSON.parse(userData).token : '';
        const res = await axios.post(`https://chat-app-iota-blue.vercel.app/api/message/send/${selectedUser._id}`,
            {message},
            {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            });

            console.log(res.data.newMessage)
            if (res.data.newMessage) {
                dispatch(setMessages([...messages, res.data.newMessage]));
            }
    
            //console.log(res.data);
            setMessage("")
     }
    return (
        <form onSubmit={handlerSubmit} className='px-4 my-3'>
            <div className='w-full relative'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder='Send a message...'
                    className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
                />
                <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4'>
                    <IoSend />
                </button>
            </div>
        </form>
    )
}

export default SendInput