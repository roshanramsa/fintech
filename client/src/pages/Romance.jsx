import { useState } from "react";
import axios from "axios";

const users = [
  { id: 1, name: "Emily", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Jake", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, name: "Sophia", avatar: "https://randomuser.me/api/portraits/women/56.jpg" },
];

export default function Chatbot() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...(messages[selectedUser.id] || []), { text: input, sender: "user" }];
    setMessages({ ...messages, [selectedUser.id]: newMessages });
    setInput("");

    try {
      const response = await axios.post("http://localhost:3000/generate", { prompt: input });
      const aiReply = response.data.response || "I'm not sure about that.";
      setMessages((prev) => ({
        ...prev,
        [selectedUser.id]: [...prev[selectedUser.id], { text: aiReply, sender: "bot" }],
      }));
    } catch (error) {
      console.error("Error fetching AI response", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-1/4 p-4 border-r border-gray-700">
        <h2 className="text-xl font-bold mb-4">Chat Users</h2>
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-800 ${
              selectedUser.id === user.id ? "bg-gray-700" : ""
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
            <span>{user.name}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-700 font-bold text-lg bg-gray-800">
          Chat with {selectedUser.name}
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {(messages[selectedUser.id] || []).map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === "user" ? "bg-blue-600 ml-auto" : "bg-gray-700"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        {/* Input Box */}
        <div className="p-4 border-t border-gray-700 flex bg-gray-800">
          <input
            className="flex-1 p-2 rounded-lg bg-gray-700 text-white outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="ml-3 px-4 py-2 bg-blue-600 rounded-lg"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
