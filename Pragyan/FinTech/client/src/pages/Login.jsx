import { useEffect, useState } from "react";

function SignupPage() {
    const [lives, setLives] = useState(() => parseInt(localStorage.getItem("health")) || 3);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [aiMessage, setAiMessage] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [showAiBox, setShowAiBox] = useState(false);
    const [loginFlag, setLoginFlag] = useState(() => JSON.parse(localStorage.getItem("loginFlag")) || false);

    useEffect(() => {
        localStorage.setItem("health", lives);
    }, [lives]);

    useEffect(() => {
        localStorage.setItem("loginFlag", JSON.stringify(loginFlag));
    }, [loginFlag]);

    useEffect(() => {
        if (loginFlag) {
            sendExtraEmails();
        }
    }, [loginFlag]);

    const fetchAIResponse = async () => {
        setIsFetching(true);
        setShowAiBox(true);
        try {
            const response = await fetch("http://localhost:3000/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: "Advise the user on online security best practices." }),
            });
            const data = await response.json();
            setAiMessage(data.response || "AI says: Stay safe online!");
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setAiMessage("AI is speechless...");
        } finally {
            setIsFetching(false);
        }
    };

    const sendExtraEmails = () => {
        console.log("Sending extra security emails...");
        // Simulate sending extra security messages
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchAIResponse();
        setLoginFlag(true);
        alert("Signup Submitted!");
    };

    return (
        <>
            <div className="absolute mt-18 inset-0 bg-black/70"></div>
            <img className="absolute w-70" src="./src/assets/riyal.png" alt="pragyan logo" />
            <div className="flex items-start justify-center h-screen bg-[url(./src/assets/shit.jpg)] bg-opacity-1">
                <div className="absolute left-10 top-10 w-100 h-1 mt-70 z-0" >
                    <h1 className="text-gray-900 text-opacity-5 font-[Sixtyfour]">Could this be a scam?</h1>
                </div>

                <div className="relative z-10 mt-20 bg-black p-10 rounded-xs shadow-2xl w-96 border-blue-500 border-2">
                    <h2 className="text-2xl justify-center font-extrabold text-center text-blue-500 mb-6 font-[Sixtyfour]">Join Pragyan '25</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label className="block text-slate-50 font-medium font-[Sixtyfour]"> <span className="font-sans text-xl">&gt; </span>Enter name </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="text-white w-full p-3 border border-slate-800 rounded-lg mt-1 focus:ring-2 focus:ring-green-100 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block text-slate-50 font-medium font-[Sixtyfour]"> <span className="font-sans text-xl">&gt; </span>Enter email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="text-white w-full p-3 border border-slate-800 rounded-lg mt-1 focus:ring-2 focus:ring-green-100 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block text-slate-200 font-medium font-[Sixtyfour]"> <span className="font-sans text-xl">&gt; </span>Enter password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-slate-800 rounded-lg mt-1 focus:ring-2 focus:ring-green-100 focus:outline-none"
                                required
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-slate-800 p-3 rounded-lg text-lg font-bold shadow-lg hover:from-purple-600 hover:to-blue-500 transition duration-300 font-[Sixtyfour]">
                            Sign Up
                        </button>
                    </form>
                    <p className="text-center text-xs text-slate-50 mt-4 font-[Sixtyfour]">Or <a href="#" className="text-blue-500 font-medium hover:underline">Log in</a> idc</p>
                </div>
            </div>
            {showAiBox && (
                <div className="absolute right-10 top-20 bg-gray-800 p-5 rounded-xl shadow-lg w-80 min-h-[100px] flex flex-col items-center justify-center">
                    <h3 className="text-xl font-bold text-red-400">AI Warning</h3>
                    <p className="text-white mt-2 text-center">{isFetching ? "Waiting for AI response..." : aiMessage}</p>
                </div>
            )}
        </>
    );
}

export default SignupPage;
