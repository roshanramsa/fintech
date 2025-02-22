import { useEffect, useState } from "react";

const SignupPage = ({lives, setLives}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [aiMessage, setAiMessage] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [showAiBox, setShowAiBox] = useState(false);

    useEffect(() => {
        localStorage.setItem("health", lives);
    }, [lives]);

    const fetchAIResponse = async () => {
        setIsFetching(true);
        setShowAiBox(true);
        try {
            const response = await fetch("http://localhost:3000/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: "The player lost a life falling for a phishing scam, advise them on how to avoid scams like these. Mentiion how they missed the misspelled pasword and the illegit logo and the '.gmail.com' address for a professional mail" }),
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

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchAIResponse()
        setLives((prev) => prev - 1)
        alert(`Lives remaining: ${lives - 1}`)
        }

    return (
        <div className="flex items-start justify-center h-screen bg-gradient-to-r from-pink-900 to-blue-900 bg-opacity-1">
            <img className="w-70 absolute top-10 left-1.5" src="./src/assets/fakeprag(1).png" alt="" />
            <div className="relative z-10 mt-20 bg-gray-900 p-10 rounded-xl shadow-2xl w-96">
                <h2 className="text-3xl font-extrabold text-center text-slate-200 mb-6">Join Pragyan '25</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block text-slate-50 font-medium">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="text-white w-full p-3 border border-slate-800 rounded-lg mt-1 focus:ring-2 focus:ring-green-100 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-slate-50 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="text-white w-full p-3 border border-slate-800 rounded-lg mt-1 focus:ring-2 focus:ring-green-100 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-slate-50 font-medium">Pasword</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border text-white border-slate-800 rounded-lg mt-1 focus:ring-2 focus:ring-green-100 focus:outline-none"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg text-lg font-bold shadow-lg hover:from-purple-600 hover:to-blue-500 transition duration-300">
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-slate-50 mt-4">Already have an account? <a href="#" className="text-blue-500 font-medium hover:underline">Log in</a></p>
            </div>
            {showAiBox && (
                <div className="absolute right-10 top-30 bg-gray-800 p-5 rounded-xl shadow-lg w-80 min-h-[100px] flex flex-col items-center justify-center">
                    <h3 className="text-xl font-bold text-red-400">AI Warning</h3>
                    <p className="text-white mt-2 text-center">{isFetching ? "Waiting for AI response..." : aiMessage}</p>
                </div>
            )}
        </div>
    );
}

export default SignupPage;
