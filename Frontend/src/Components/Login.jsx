import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faGoogle } from "@fortawesome/free-brands-svg-icons";
import './login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
const Login = () => {

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, SetIsLogin] = useState(null)
    // const navigate = useNavigate()

    const formSubmit = async (e) => {
        e.preventDefault();
        const endPoints = isLogin ? "/login" : "/register"
        try {
            const res = await axios.post(`http://localhost:3500/api/User${endPoints}`, { user, password })
            if (isLogin) {
                localStorage.setItem('token', res.data.token);
                toast.success("Login Successful 🎉", { position: "top-center" });
            } else {
                toast.success("Registered Successfully ", { position: "top-center" });
            }
        } catch (error) {
            alert(error.response.data.message || 'Error');

        }

    }
    return (
        <>
            <div className='Login-Main'>
                <form action="" onSubmit={formSubmit} className='bg-white w-90 max-w-xs md:max-w-md  h-auto m-auto p-8 mt-40  rounded-xl'>
                    <h1 className='text-center text-3xl m-5 uppercase tracking-wider'>{isLogin ? "Login" : "Register"}</h1>
                    <label htmlFor="" className='text-center p-2'>Username</label> <br />
                    <input type="text" value={user} onChange={(e) => setUser(e.target.value)} className='p-2 w-full border-b border-blue-900 rounded-l mt-3' placeholder='Type your username' /> <br />
                    <label htmlFor="" className='p-2'>Password</label> <br />
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 w-full border-b border-blue-900 rounded-l mt-3' placeholder='Type your Password' /> <br />
                    <a href="" className='float-right text-sm text-blue-900 m-3'>Forget Password?</a> <br />
                    <button type='submit' className='w-full h-auto bg-blue-900 text-white rounded-xl p-1 tracking-widest cursor-pointer'>{isLogin ? "Login" : "Register"}</button>
                    <p className='flex justify-center m-4 text-purple-800 tracking-widest' onClick={() => SetIsLogin(!isLogin)}>{isLogin ? "Register?" : "Login?"}</p>
                    <div className='flex justify-center space-x-7'>
                        <FontAwesomeIcon icon={faFacebook} className="text-blue-600 text-3xl hover:scale-110 transition" />
                        <FontAwesomeIcon icon={faTwitter} className="text-sky-500 text-3xl hover:scale-110 transition" />
                        <FontAwesomeIcon icon={faGoogle} className="text-red-500 text-3xl hover:scale-110 transition" />
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </>

    )
}

export default Login