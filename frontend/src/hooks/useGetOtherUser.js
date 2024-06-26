import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
import axios from "axios";
import Cookies from "js-cookie"
const useGetOtherUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const userData = Cookies.get('userData');
       
        const token = userData ? JSON.parse(userData).token : '';
        //console.log(token, 3); // Kiểm tra giá trị của token
        const res = await axios.get('https://chat-app-iota-blue.vercel.app/api/user', {
          //withCredentials:true,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

      // Xử lý dữ liệu phản hồi
      //console.log(res.data);
      dispatch(setOtherUsers(res.data));
      } catch (error) {
        // Xử lý lỗi khi gọi API
        console.log("Error fetching other users:", error);
      }
    };

    // Gọi hàm fetchOtherUsers khi component được mount (truyền vào mảng rỗng để chỉ gọi một lần)
    fetchOtherUsers();
  }, []); // Dependency array rỗng để chỉ gọi effect một lần khi component mount

};

export default useGetOtherUser;
