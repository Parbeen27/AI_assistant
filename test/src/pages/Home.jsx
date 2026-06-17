import React, { useEffect, useState, useRef, useContext } from "react";
import { FaMicrophone, FaMicrophoneSlash, FaPaperPlane, FaTrash, FaTimes } from "react-icons/fa";
import voice from "../assets/voice.gif";
import api from "../services/api";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { userData } from "../context/UserContext";
export default function Home() {
  const [message, setMessage] = useState("");
  const {setUser} = useContext(userData)
  const [isListening, setIsListening] = useState(false);
  const isListeningRef = useRef(false);
  const recognitionRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate()
  
  const clearAll = () => {
  setMessages([]);
  setMessage("");
};
const deleteConversation = (index) => {
  setMessages((prev) =>
    prev.filter((_, i) => i !== index && i !== index + 1)
  );
};
const logout = async() => {
  try {
    const res = await api.post("/auth/logout")
    console.log(res.data);
    localStorage.removeItem("accessToken")
    setUser(null)
    navigate("/signin")
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.log("Speech Recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onstart = () => {
    console.log("Listening...");
    setIsListening(true);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);

    setMessage(transcript);
  };

  recognition.onerror = (event) => {
    console.log("Speech Error:", event.error);
    setIsListening(false);
  };

  recognition.onend = () => {
    console.log("Stopped");
    setIsListening(false);
  };

  recognitionRef.current = recognition;
}, []);

  const startListening = () => {
  if (!recognitionRef.current) return;

  recognitionRef.current.start();
};

const handleSend = async () => {
  if (!message.trim()) return;

  const userMessage = {
    role: "user",
    content: message,
  };

  setMessages((prev) => [...prev, userMessage]);

  try {
    const res = await api.post("/user/ai", {
      message,
    });
    
    const aiMessage = {
      role: "assistant",
      content: res.data.response.response,
    };

    setMessages((prev) => [...prev, aiMessage]);
  } catch (error) {
    console.log(error);
  }

  setMessage("");
};
  return (
    <div className="w-full h-screen bg-gradient-to-t from-black via-slate-950 to-blue-950 flex flex-col">
      {/* Header */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
  <h1 className="text-white text-2xl font-bold">
    AI Assistant
  </h1>

  <button
    onClick={clearAll}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition active:scale-75"
  >
    <FaTrash/>
  </button>
   <button onClick={logout} className='cursor-pointer bg-red-500 p-2 rounded-2xl text-white hover:bg-red-600 active:scale-75'><MdLogout/></button>
</div>

      {/* Main Area */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
  <div className="max-w-4xl mx-auto flex flex-col gap-4">

    {messages.length === 0 && (
      <div className="flex flex-col items-center mt-20">
        <img
          src={voice}
          alt=""
          className="h-40 object-contain"
        />

        <h2 className="text-white text-2xl font-semibold mt-4">
          AI Voice Assistant
        </h2>

        <p className="text-gray-400 mt-2">
          Ask me anything...
        </p>
      </div>
    )}

    {messages.map((msg, index) => (
  <div
    key={index}
    className={`group relative max-w-[75%] px-4 py-3 rounded-2xl ${
      msg.role === "user"
        ? "self-end bg-blue-600 text-white"
        : "self-start bg-white/10 text-white"
    }`}
  >
    <p>{msg.content}</p>

    <button
      onClick={() => deleteMessage(index)}
      className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 bg-red-500 rounded-full h-6 w-6 flex items-center justify-center text-xs transition"
    >
      <FaTimes/>
    </button>
  </div>
))}

  </div>
</div>
      {/* Input Section */}
      <div className="p-5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-3 flex items-center gap-3">

            {/* Mic Button */}
            <button
              onClick={startListening}
              className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isListening
                  ? "bg-red-500 shadow-lg shadow-red-500/30"
                  : "bg-cyan-500 hover:bg-cyan-600"
              }`}
            >
              {isListening ? (
                <FaMicrophoneSlash className="text-white text-lg" />
              ) : (
                <FaMicrophone className="text-white text-lg" />
              )}
            </button>

            {/* Input */}
            <input
              type="text"
              placeholder="Ask anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-2"
            />

            {/* Send Button */}
            <button
              onClick={handleSend}
              className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-all"
            >
              <FaPaperPlane className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}