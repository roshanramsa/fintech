import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [shapes, setShapes] = useState([]);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cnfPass, setCnfPass] = useState();


  const [curUser, setCurUser] = useState();
  const [curPass, setCurPass] = useState();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login) {
      navigate("/email")
    } else {
      alert("Hmm, I don't need to signup, I already have a Email account")
    }
  }

  useEffect(() => {
    setShowPass(false)
  }, [login])

  useEffect(() => {
    const generatedShapes = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 30) + 20, 
      top: Math.random() * 70 + 10, 
      left: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.2,
      borderRadius: Math.random() > 0.5 ? '50%' : '0%',
      rotate: Math.random()*360,
      radius: Math.random()*250 + 100
    }));
    setShapes(generatedShapes);
  }, []);

  return (
    <>
      <div className='flex h-screen w-screen justify-center items-center overflow-hidden'>
        <div className='w-full absolute h-full overflow-hidden'>
          {shapes.map((shape, i) => (
            <div className={`bg-radial from-white via-15% to-neutral-300 absolute animate-border-rotate`}
            style={{
              height: shape.size,
              width: shape.size,
              left: `${3 + 5 * i}%`,
              top: `${shape.top}%`,
              opacity: shape.opacity,
              rotate: `var(--border-angle)`,
              transform: `rotate(${shape.rotate + i * 55}deg) translate(0px, ${shape.radius}px)`
            }}></div>
          ))}
        </div>      
        <div className='relative flex'>
          <div className='Login font-poppins flex justify-center items-center bottom-10 absolute group'>
            <div onClick={() => {setLogin(true)}} className='py-2 px-3 absolute w-[40vw] h-[80vh] backdrop-blur-[8px] border-[1px] shadow-2xl transition-all flex-col flex gap-5 overflow-hidden'>
              <h2 className={`bg-gradient-to-r text-center font-bold transition-all duration-500 from-pink-300 to-pink-400 inline-block text-transparent bg-clip-text ${login ? "text-[50px] mt-5" : "text-[40px] group-hover:text-[45px]"}`}>Login</h2>
              <div className={`flex flex-col items-center gap-5 mt-2 transition-all ${login ? "" : "mt-20 opacity-0"}`}>
                <input className='self-center py-5 px-10 bg-gradient-to-l from-transparent to-gray-100 border w-[80%] rounded-xl' type="text" placeholder='Enter your Email ID' onChange={(e) => {setCurUser(e.target.value)}}/>
                <input className='self-center py-5 px-10 bg-gradient-to-l from-transparent to-gray-100 border w-[80%] rounded-xl' type={`${showPass ? "text" : "password"}`} placeholder='Password' onChange={(e) => {setCurPass(e.target.value)}}/>              
              </div>
              <div className='w-[80%] self-center flex justify-between'>
                <div className='flex gap-2'>
                  <button onClick={() => setShowPass(!showPass)} className={`w-4 h-4 rounded-sm border-[1px] mt-[6px] border-gray-700 transition-all hover:bg-blue-300 cursor-pointer ${showPass ? "bg-blue-600": "bg-white"}`}></button>
                  <p className='hover-text-gradient bg-clip-text w-fit text-lg'>Show Password</p>
                </div>
                <p className="hover-text-gradient bg-clip-text w-fit text-lg cursor-pointer">
                  Forgot Password?
                </p>
              </div>
              <button onClick={handleSubmit} className='cursor-pointer rounded-2xl self-center py-3 px-5 w-[80%] transition-all duration-700 bg-pink-300 flex items-center justify-center hover:font-semibold hover:scale-105 hover:shadow-lg'>
                <p className='text-white text-2xl'>Login</p>
              </button>
            </div>
          </div>

          <div className={`Signup font-poppins justify-center transition-all items-center mt-[3px] z-[1] flex absolute`}>
            <div onClick={() => {setLogin(false)}} className={`py-2 px-3 bg-[url(src/assets/nightsky.jpg)] bg-cover shadow-2xl absolute w-[40vw] transition-all pt-10 pb-10 duration-500 ease-in-out flex-col flex gap-5 group ${login ? "scale-y-[15%] mt-[385px] rounded-t-[60%]" : "rounded-t-[30%]"}`}>
              <h2 className={`bg-white text-center font-bold inline-block text-transparent bg-clip-text transition-all ${login ? "text-[40px] group-hover:text-[45px] scale-y-[666%] mt-[250px] duration-500" : "text-[50px] duration-[1]"}`}>Sign up</h2>
              <div className='flex flex-col transition-all gap-5 mt-2'>              
                <input className={`self-center py-5 px-10 bg-gradient-to-l transition-all from-transparent to-gray-100 border w-[80%] rounded-xl ${login ? "scale-y-0" : ""}`} type="text" placeholder='Enter your Email ID' onChange={(e) => {setEmail(e.target.value)}}/>
                <input className={`self-center py-5 px-10 bg-gradient-to-l transition-all from-transparent to-gray-100 border w-[80%] rounded-xl ${login ? "scale-y-0" : ""}`} type="text" placeholder='Password' onChange={(e) => {setPassword(e.target.value)}}/>
                <input className={`self-center py-5 px-10 bg-gradient-to-l transition-all from-transparent to-gray-100 border w-[80%] rounded-xl ${login ? "scale-y-0" : ""}`} type="text" placeholder='Confirm Password' onChange={(e) => {setCnfPass(e.target.value)}}/>
              </div>
              <button onClick={handleSubmit} className={`bg-gradient-to-r from-blue-400 to-blue-800 cursor-pointer rounded-2xl self-center py-3 px-5 w-[80%] transition-all duration-300 hover:font-semibold hover:scale-105 hover:shadow-lg ${login ? "scale-y-0" : ""}`}>
                <p className='text-white text-2xl'>Continue</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home