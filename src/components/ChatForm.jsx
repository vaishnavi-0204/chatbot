import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault(); // preventing the form from submitting

    const userMessage = inputRef.current.value.trim(); // getting the value and removing the white spaces
    if (!userMessage) return;
    inputRef.current.value = ""; // clearing the message input after getting the value
    // update chat history with user's message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);
    // add a thinking.. placeholder for that bot's response
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking...." },
      ]);
      // call the function to generate the bots's response
      generateBotResponse([
        ...chatHistory,
        { role: "user", text: userMessage },
      ]);
    }, 600);
  };
  return (
    <div>
      <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Message.."
          className="message-input"
          required
        ></input>
        <button className="material-symbols-rounded">arrow_upward</button>
      </form>
    </div>
  );
};

export default ChatForm;
