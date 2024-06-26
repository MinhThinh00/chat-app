import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/userSlice";
import Cookies from "js-cookie"
const Login = () => {
	const dispatch= useDispatch()
	const Navigate = useNavigate()
	const [user, setUser]= useState({
		username: '',
        password: ''

	})
	const handleSubmit = async (e) => {
        e.preventDefault()
        
		try {
			const res= await axios.post("https://chat-app-iota-blue.vercel.app/api/auth/login", user)
			console.log(res.data)
			Cookies.set('userData', JSON.stringify(res.data));
			console.log(Cookies.get('userData'), 1);
			dispatch(setAuthUser(res.data))
			Navigate("/")
		} catch (error) {
			
			toast.error(error.response.data.error)
			console.log(error)
		}

    }
	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input type='text' placeholder='Enter username' 
						className='w-full input input-bordered h-10'
						onChange={(e)=>setUser({...user, username: e.target.value})}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							onChange={(e)=>setUser({...user, password: e.target.value})}
						/>
					</div>
					<Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2'>Login</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;