import { useSelector,useDispatch } from 'react-redux';

import { setOnlineUsers } from './redux/userSlice';
import { setSocket } from './redux/socketSlice';
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import  PrivateRoute  from './components/PrivateRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import io from "socket.io-client";
function App() {
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(authUser){
      const socketio = io('https://chat-app-iota-blue.vercel.app', {
          query:{
            userId:authUser._id
          }
      });
      dispatch(setSocket(socketio));

      socketio?.on('getOnlineUsers', (authUser)=>{
        console.log("Online users received:", authUser); 
        dispatch(setOnlineUsers(authUser))
      });
      return () => socketio.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }

  },[authUser]);
  return (
    <BrowserRouter>
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        {/* <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />}/>
        <Route element= {<PrivateRoute/>}>
            <Route path='/' element={<Home />} />
        </Route>
      </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App
