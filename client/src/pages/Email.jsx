import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded-full bg-slate-100/10 text-white font-medium shadow-md hover:bg-slate-600/30 ${className}`} {...props}>
    {children}
  </button>
);

const defaultEmailCategories = {
  primary: [
    { 
      id: 1, 
      sender: "Pragyan", 
      email: "pragyan@gmail.com", 
      subject: "Hackathon", 
      content: 'Click <a href="http://localhost:5173/FakeLogin" target="_blank" class="text-blue-500 underline">here</a> to complete the registration for your hackathon.', 
      starred: false,
      read: false
    },
    { 
      id: 2, 
      sender: "Pragyan Team", 
      email: "contact@pragyan.org", 
      subject: "Pragyan Registration Confirmation", 
      content: 'Thank you for registering for Pragyan 2025. Click <a href="http://localhost:5173/login" target="_blank" class="text-blue-500 underline">here</a> to verify your account and access exclusive event details.', 
      starred: false,
      read: false
    },
  ],
  promotions: [
    { id: 4, sender: "Festember", subject: "PRAGYAN IS BETTER", content: "Check out our latest collection.", starred: false, read: false },
    { id: 7, sender: "Amazon", subject: "Exclusive Discount!", content: "Save 50% on select products for today only!", starred: false, read: false },
    { id: 8, sender: "Nike", subject: "New Arrivals", content: "Check out our latest sneakers and apparel!", starred: false, read: false },
    { id: 9, sender: "Spotify", subject: "Premium for Less!", content: "Get 3 months of Premium for just $1!", starred: false, read: false },
    { id: 10, sender: "Apple", subject: "Special Event Invite", content: "Join us for our latest product announcements.", starred: false, read: false },
  ],
  social: [
    { id: 5, sender: "Facebook", subject: "New Friend Request", content: "You have a new friend request from Alex.", starred: false, read: false },
    { id: 6, sender: "Twitter", subject: "Trending Topics", content: "Check out the latest trends on Twitter.", starred: false, read: false },
  ]
};

function Email() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [activeTab, setActiveTab] = useState("primary");
  const [emails, setEmails] = useState(() => {
    const storedEmails = localStorage.getItem("emails");
    return storedEmails ? JSON.parse(storedEmails) : defaultEmailCategories;
  });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (emails.primary.some(email => email.id === 13 && email.read)) {
      setShowPopup(true);
    }
  }, [emails]);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setEmails((prevEmails) => {
      const updatedEmails = {
        ...prevEmails,
        [activeTab]: prevEmails[activeTab].map((e) =>
          e.id === email.id ? { ...e, read: true } : e
        ),
      };
      localStorage.setItem("emails", JSON.stringify(updatedEmails));
      return updatedEmails;
    });
  };

  return (
    <div className="flex h-screen bg-[url(./src/assets/shit.jpg)]">
      <div className="mt-2 w-64 shadow-lg p-4 flex flex-col">
        <Button className="w-40 mx-auto mb-4 bg-white/30">Compose</Button>
        <ul className="space-y-2 text-white font-medium">
          {Object.keys(defaultEmailCategories).map((category) => (
            <li 
              key={category} 
              className={`flex items-center p-3 rounded-lg cursor-pointer ${activeTab === category ? "bg-blue-900" : "hover:bg-gray-900"}`} 
              onClick={() => setActiveTab(category)}
            >
              {category === "primary" ? "📥 Primary" : category === "promotions" ? "🎉 Promotions" : "👥 Social"}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-2 flex-1 flex flex-col bg-white/30 backdrop-blur-md shadow-lg rounded-lg">
        <div className="flex-1 p-4 overflow-auto">
          <h2 className="text-xl font-bold mb-4 capitalize text-slate-900/90">{activeTab}</h2>
          {emails[activeTab].map((email) => (
            <div
              key={email.id}
              className={`rounded-lg bg-gray-100/20 p-4 grid grid-cols-[200px_auto] hover:bg-gray-100/70 cursor-pointer my-0.5 ${email.read ? "opacity-50" : "opacity-100"}`}
              onClick={() => handleEmailClick(email)}
            >
              <p className="font-semibold text-black truncate">{email.sender}</p>
              <p className="text-black font-semibold">{email.subject}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 w-1/3 p-6 ml-1 bg-white/30 backdrop-blur-xl shadow-lg border border-gray-300 rounded-lg">
        {selectedEmail ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedEmail.subject}</h2>
            <p className="text-black mt-2">From: <span className="font-semibold">{selectedEmail.email}</span></p>
            <hr className="my-4" />
            <p className="text-black" dangerouslySetInnerHTML={{ __html: selectedEmail.content }} />
          </div>
        ) : (
          <p className="text-black text-center mt-10">Select an email to view details</p>
        )}
      </div>
      {showPopup && (
        <div className="fixed bottom-10 right-10 bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2">
          <span className="cursor-pointer" onClick={() => navigate("/Romance")}>Want a date? ❤️ Click here</span>
          <button 
            className="bg-white text-red-500 rounded-full px-2 py-1 text-sm font-bold" 
            onClick={() => setShowPopup(false)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default Email;