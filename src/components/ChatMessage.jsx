import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
  return (
    // updating classname based on the chat's role
    <div
      className={`message  ${chat.role === "model" ? "bot" : "user"}-message`}
    >
    {/*adding the chatbot icon only if the caht role is model */}
      {chat.role === "model" && <ChatbotIcon />}
      {/*chat.text come from chatform.jsx */}
      <p className="message-text">{chat.text}</p>
    </div>
  );
};

export default ChatMessage;
