import { useState } from "react";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signing up with", name, email, password);
    // Add signup logic here
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
                <form onSubmit={handleSignup}>
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
                    <label className="block text-slate-50 font-medium font-[Sixtyfour]"><span className="font-sans text-xl">&gt; </span>Enter email</label>
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
    </>
  );
}

export default SignupPage;