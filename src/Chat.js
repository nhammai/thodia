import React, { useState, useEffect } from 'react';
import './Chat.css';
import axios from 'axios';

const Chat = () => {
 const [messages, setMessages] = useState([]);
 const [input, setInput] = useState('');

 useEffect(() => {
   setMessages([{ text: "Hey bro, My name is Kenny. I'm a Tho dia of this land. How can I help you?", sender: 'Kenny' }]);
 }, []);

 const sendMessage = async () => {
  setInput(''); // Clear the input field immediately

  const timestamp = new Date().toLocaleTimeString();

  // Add user's message to state immediately
  setMessages(prevMessages => [
    ...prevMessages,
    { text: input, sender: 'Nham', timestamp }
  ]);

  const chatbotResponse = await getChatbotResponse(input);

  // Add chatbot's response to state after it's received
  setMessages(prevMessages => [
    ...prevMessages,
    { text: chatbotResponse, sender: 'Kenny', timestamp: new Date().toLocaleTimeString() }
  ]);
};
 const getChatbotResponse = async (message) => {
   try {
     const response = await axios.post('https://chatbotapi.nhammai.repl.co/ask', {
       prompt: message
     });
     return response.data.answer;
   } catch (error) {
     console.error(error);
   }
 };

 return (
   <div className="chat-container">
     {messages.map((message, index) => (
       <div key={index} className="message">
         <p><strong>{message.sender}</strong>: {message.text}</p>
       </div>
     ))}
     <div className="input-container">
        <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          sendMessage();
          e.preventDefault(); // This will prevent the form from being submitted which would cause a page refresh.
        }
      }}
      type="text"
      className="input-field"
    />
       <button onClick={sendMessage} className="send-button">Send</button>
     </div>
   </div>
 );
};

export default Chat;
