import { useState, useRef, useEffect } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking...."),
        { role: "model", text, isError },
      ]);
    };

    const userMessage = history[history.length - 1].text;

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Explain in a fun and simple way for kids: ${userMessage}`,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong!");

      const apiResponseText = data.candidates[0].content.parts[0].text.trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.error("Error in API call:", error.message);
      updateHistory("Oops! Something went wrong. Try again! 😊", true);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className="container">
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        className="bg-[#6D4FC2] text-white p-2 rounded-full shadow-lg"
      >
        🤖 Chat with Python Tutor!
      </button>

      {/* Conditional rendering based on showChatbot */}
      <div
        className={`chatbot-popup ${
          showChatbot ? "block" : "hidden"
        } border-2 border-blue-300 rounded-lg shadow-lg p-4 bg-white`}
      >
        <div className="chatbot-header flex justify-between items-center bg-blue-200 p-2 rounded-md">
          <div className="header-info flex items-center">
            <ChatbotIcon />
            <h2 className="text-lg font-bold text-white-700">
              Python Tutor Bot 🐍
            </h2>
          </div>
          <button
            onClick={() => setShowChatbot((prev) => !prev)}
            className="text-red-500 font-bold"
          >
            ✖
          </button>
        </div>

        <div ref={chatBodyRef} className="chat-body p-2 overflow-auto max-h-80">
          <div className="message bot-message p-2 rounded-lg">
            <ChatbotIcon />
            <p className="message-text font-medium">
              👋 Hi there! Ready to learn Python in a fun way? 🚀
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer p-2">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default App;

// import { useRef, useEffect, useState } from "react";
// import ChatbotIcon from "./components/ChatbotIcon";
// import ChatForm from "./components/ChatForm";
// import ChatMessage from "./components/ChatMessage";

// const App = () => {
//   const [chatHistory, setChatHistory] = useState([]);
//   const [showChatbot, setShowChatbot] = useState(false);

//   const chatBodyRef = useRef();

//   const generateBotResponse = async (history) => {
//     const updateHistory = (text, isError = false) => {
//       setChatHistory((prev) => [
//         ...prev.filter((msg) => msg.text !== "Thinking...."),
//         { role: "model", text, isError },
//       ]);
//     };

//     const userMessage = history[history.length - 1].text;

//     try {
//       const response = await fetch(import.meta.env.VITE_API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [
//             {
//               role: "user",
//               parts: [
//                 {
//                   text: `Explain in a fun and simple way for kids: ${userMessage}`,
//                 },
//               ],
//             },
//           ],
//         }),
//       });

//       const data = await response.json();
//       if (!response.ok)
//         throw new Error(data.error.message || "Something went wrong!");

//       const apiResponseText = data.candidates[0].content.parts[0].text.trim();
//       updateHistory(apiResponseText);
//     } catch (error) {
//       console.error("Error in API call:", error.message);
//       updateHistory("Oops! Something went wrong. Try again! 😊", true);
//     }
//   };

//   useEffect(() => {
//     if (chatBodyRef.current) {
//       chatBodyRef.current.scrollTo({
//         top: chatBodyRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [chatHistory]);

//   return (
//     <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
//       <button
//         onClick={() => setShowChatbot((prev) => !prev)}
//         id="chatbot-toggler"
//         className="bg-[#6D4FC2] text-white p-2 rounded-full shadow-lg"
//       >
//         🤖 Chat with Python Tutor!
//       </button>

//       <div className="chatbot-popup border-2 border-blue-300 rounded-lg shadow-lg p-4 bg-white">
//         <div className="chatbot-header flex justify-between items-center bg-blue-200 p-2 rounded-md">
//           <div className="header-info flex items-center">
//             <ChatbotIcon />
//             <h2 className="text-lg font-bold text-white-700">
//               Python Tutor Bot 🐍
//             </h2>
//           </div>
//           <button
//             onClick={() => setShowChatbot((prev) => !prev)}
//             className="text-red-500 font-bold"
//           >
//             ✖
//           </button>
//         </div>

//         <div ref={chatBodyRef} className="chat-body p-2 overflow-auto max-h-80">
//           <div className="message bot-message  p-2 rounded-lg">
//             <ChatbotIcon />
//             <p className="message-text font-medium">
//               👋 Hi there! Ready to learn Python in a fun way? 🚀
//             </p>
//           </div>

//           {chatHistory.map((chat, index) => (
//             <ChatMessage key={index} chat={chat} />
//           ))}
//         </div>

//         <div className="chat-footer p-2">
//           <ChatForm
//             chatHistory={chatHistory}
//             setChatHistory={setChatHistory}
//             generateBotResponse={generateBotResponse}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
