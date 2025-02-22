import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Amazmom from './pages/Amazmom'
import { objects } from './constants'
import LoginPage from './pages/Login'
import Email from './pages/Email'
import ScamLoginPage from './pages/FakeLogin'
import RomanceScamChatbot from './pages/Romance'

const dialogues = [
  "Hello there!",
  "How are you today?",
  "I have something interesting to tell you...",
  "React makes UI development fun!",
  "Click again to restart!"
];

const DynamicPlaceholder = () => {
  const location = useLocation();
  
  const routePlaceholders = {
    '/': 'https://Gmail.com/Login',
    '/Amazmom': 'http://AmazmomDeals.com',
    '/Email': 'https://Gmale.com/YourInbox',
    '/login': 'https://Pragyan.com/SecureLogin',
    '/FakeLogin': 'http://Prágyan.com/AccountVerification',
    '/Romance': 'http://RomanticChat.com/MILF'
  };

  return (
    <input 
      className='bg-pink-800 text-white rounded-2xl px-5 py-[5px] w-[80%] cursor-default' 
      type="text" 
      placeholder={routePlaceholders[location.pathname] || 'https://Pragyan.com/SecureLogin'}
      readOnly
    />
  );
};

const App = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [dialogue, setDialogue] = useState(true);

  useEffect(() => {
    if (charIndex < dialogues[index].length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + dialogues[index][charIndex]);
        setCharIndex(charIndex + 1);
      }, 25);

      return () => clearTimeout(timeout);
    }
  }, [charIndex, index]);

  useEffect(() => {
    setDisplayText("");
    setCharIndex(0);
  }, [index]);

  useEffect(() => {
    let lives = localStorage.getItem("health"); 
    if (lives < 1) {
      localStorage.clear();
      window.location.reload();
      localStorage.setItem('health', 3)
      location.href = "http://localhost:5173/email"
    }
  })

  const handleNextDialogue = () => {
    setFade(false); 

    setTimeout(() => {
      setIndex((prev) => (prev < dialogues.length - 1 ? prev + 1 : 0));
      if (index == dialogues.length - 1) {
        setDialogue(false)  
      }
      setFade(true);
    }, 500);
  };

  return (
    <>
      <BrowserRouter>
        <div className='bg-pink-300 h-screen w-screen'>
          
          <div className='flex gap-5 absolute z-0'>
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className='flex flex-col gap-2'>
                {Array.from({ length: 4 }, (_, j) => (
                  <img key={j} src={objects[j]} alt={`Object ${j}`} height={30} width={30} />
                ))}
              </div>
            ))}
          </div>

          <div className='flex gap-1 items-center px-1 absolute z-[1] w-full'>
            <div className='w-[32px] bg-pink-200 h-[30px] rounded-[30%] hover:bg-pink-100'></div>
            <div className='bg-pink-200 h-[38px] rounded-t-[50%] w-[15%]'>
              <img src="" alt="" />
            </div>
          </div>

          <div className='bg-white h-[calc(100%-38px)] absolute w-full z-[1] top-[38px] overflow-hidden'>
            <div className="bg-pink-200 w-full h-[8%] flex items-center px-2 gap-3">
              <div className='flex gap-2'>
                <img className='rounded-full transition-all duration-200 hover:bg-pink-300 h-[30px]' src="src/assets/left.svg" alt="left"  height={30} width={30}/>
                <img className='rounded-full transition-all duration-200 hover:bg-pink-300 h-[30px]' src="src/assets/right.svg" alt="right" height={30} width={30}/>
                <img className='rounded-full transition-all duration-200 hover:bg-pink-300 h-[30px] px-[2.5px]' src="src/assets/refresh.svg" alt="refresh" height={30} width={30}/>
              </div>
              <DynamicPlaceholder />
            </div>
              <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/Amazmom' element={<Amazmom />}/>
                <Route path='/Email' element={<Email />}/>
                <Route path='/Login' element={<LoginPage />}/>
                <Route path='/FakeLogin' element={<ScamLoginPage />}/>
                <Route path='/Romance' element={<RomanceScamChatbot />}></Route>
              </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
