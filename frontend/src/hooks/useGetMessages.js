import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

export const useGetMessages = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    
    useEffect(() => {
       
        const GetMessages = async () => {
            try {
                if (!selectedUser) return;
                const userData = Cookies.get('userData');
                const token = userData ? JSON.parse(userData).token : '';
                const res = await axios.get(`https://chat-app-iota-blue.vercel.app/api/message/${selectedUser._id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("New messages fetched:", res.data);
                dispatch(setMessages(res.data));
            } catch (error) {
                console.log("Error fetching messages:", error);
            }
        };
        GetMessages();  
    }, [selectedUser?._id,dispatch]); 
};
