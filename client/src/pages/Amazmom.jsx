import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
  { id: 1, name: "Pragyan Hoodie", price: 9999, image: "src/assets/Hoodie.png" },
  { id: 2, name: "Pragyan T-Shirt", price: 5999, image: "src/assets/tshirt.jpeg" },
  { id: 3, name: "Pragyan Sweatshirt", price: 7999, image: "src/assets/sweatshirt.webp" },
  { id: 4, name: "Pragyan Cap", price: 2999, image: "src/assets/cap.webp" }
];

const Amazmom = ({ lives, setLives }) => {

  
  const [aiMessage, setAiMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [showAiBox, setShowAiBox] = useState(false);
  

  const fetchAIResponse = async () => {
    setIsFetching(true);
    setShowAiBox(true);
    try {
        const response = await fetch("http://localhost:3000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: "The user has fallen for the classic fake website/overwhelming popups combo. The best way to navigate this situation is to observe links carefully before clicking them and if the popups get too overwhelming just quit the site with Ctrl + W altogether. Summarise this in general in about 8-9 lines" }),
        });
        const data = await response.json();
        setAiMessage(data.response || "AI says: Be careful!");
    } catch (error) {
        console.error("Error fetching AI response:", error);
        setAiMessage("AI is speechless...");
    } finally {
        setIsFetching(false);
    }
};

  const [popups, setPopups] = useState([]);
  const navigate = useNavigate();

  const createPopups = () =>
    Array.from({ length: 15 }, () => ({
      id: Math.random(),
      top: `${Math.random() * 70 + 10}%`,
      left: `${Math.random() * 85 + 5}%`
    }));

  useEffect(() => {
    if (popups.length === 0) {
      const timeout = setTimeout(() => {
        alert("Clear all popups to proceed")
        setPopups(createPopups());
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [popups]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 relative">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-8">Pragyan Merch</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-lg font-bold text-pink-600">₹{product.price}</p>
            <button
              onClick={() => {
                setLives((prev) => prev - 1);
                fetchAIResponse()
                alert(`You have ${lives - 1} lives left`);
              }}
              className="mt-4 cursor-pointer bg-pink-500 text-white px-4 py-2 rounded-lg w-full hover:bg-pink-600 transition-all duration-300"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {popups.map((popup) => (
        <div  
          key={popup.id}
          className="absolute bg-pink-400 rounded-lg py-5 px-6 flex items-center gap-2 shadow-lg"
          style={{ top: popup.top, left: popup.left }}
        >
          <p onClick={() => {
                setLives((prev) => prev - 1);
                alert(`You have ${lives - 1} lives left`);
                fetchAIResponse();
              }} className="text-xl text-white">Hot singles in area! ❤️</p>
          <span
              onClick={() => {
                setLives((prev) => prev - 1);
                alert(`You have ${lives - 1} lives left`);
                fetchAIResponse();
              }}
            className="hover:underline hover:text-lg text-white hover:text-slate-300 cursor-pointer transition-all duration-300"
          >
            Click Here!
          </span>
          <button
            className="bg-white text-pink-500 rounded-full px-2 py-1 text-sm cursor-pointer font-bold"
            onClick={() => setPopups((prev) => prev.filter((p) => p.id !== popup.id))}
          >
            ✕
          </button>
          
          {showAiBox && (
                <div className="absolute right-10 top-20 bg-gray-800 p-5 rounded-xl shadow-lg w-80 min-h-[100px] flex flex-col items-center justify-center">
                    <h3 className="text-xl font-bold text-blue-400">AI Advice</h3>
                    <p className="text-white mt-2 text-center">{isFetching ? "Waiting for AI response..." : aiMessage}</p>
                </div>
            )}
          
        </div>
      ))}
    </div>
  );
};

export default Amazmom;
