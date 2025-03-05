// src/components/EvaChatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const EvaChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm EVA. How can I assist you today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Blinking effect for EVA's eye
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000);
    
    return () => clearInterval(blinkInterval);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Make API call to your Python backend
      const response = await axios.post('https://lab.kierz.io/chat', {
        message: userMessage.text
      });
      
      // Add bot response
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: response.data.response || "I'm having trouble connecting to my brain. Please try again later.",
          isUser: false
        }
      ]);
    } catch (error) {
      console.error('Error communicating with the server:', error);
      
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Sorry, I'm having trouble connecting to my system. Please try again later.",
          isUser: false
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div 
          className="w-80 h-96 bg-black/90 rounded-lg mb-4 flex flex-col overflow-hidden shadow-lg shadow-cyan-500/40 border border-cyan-500/50"
          style={{
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {/* Chat Header */}
          <div className="px-3 py-3 bg-cyber-dark/90 flex items-center border-b border-cyan-500/30">
            <h3 className="m-0 text-cyan-400 text-sm font-medium uppercase tracking-wider font-orbitron">
              EVA Assistant
            </h3>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`max-w-[80%] p-3 rounded-lg text-white text-sm
                  ${message.isUser 
                    ? 'bg-cyan-900/30 border border-cyan-500/30 self-end' 
                    : 'bg-gray-800/70 border border-gray-700/50 self-start'
                  }`}
              >
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="max-w-[80%] p-3 rounded-lg text-white text-sm bg-gray-800/70 border border-gray-700/50 self-start">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full" style={{ animation: 'pulse 1s infinite' }}></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full" style={{ animation: 'pulse 1s infinite 0.2s' }}></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full" style={{ animation: 'pulse 1s infinite 0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className="p-3 border-t border-cyan-500/30 bg-cyber-dark/70">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={handleInputChange}
                disabled={isLoading}
                className="flex-grow px-4 py-2 rounded-full border border-cyan-500/40 bg-gray-900/80 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
              <button 
                type="submit" 
                disabled={isLoading || !inputValue.trim()}
                className="w-9 h-9 rounded-full flex justify-center items-center bg-cyan-500 text-black disabled:bg-cyan-500/40 disabled:cursor-not-allowed hover:bg-cyan-400 transition-colors"
              >
                →
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* EVA Icon */}
      <div
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-black flex justify-center items-center cursor-pointer shadow-lg shadow-cyan-500/50 border-2 border-cyan-400 overflow-hidden relative hover:scale-110 transition-transform active:scale-95"
      >
        <div
          className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-900 relative"
          style={{
            transform: isBlinking || isLoading ? 'scaleY(0.2)' : 'scaleY(1)',
            transition: 'transform 0.2s ease'
          }}
        >
          {/* Eye pupil */}
          <div className="absolute w-4 h-4 rounded-full bg-white top-2 left-2 shadow-lg"></div>
          
          {/* Eye reflection */}
          <div className="absolute w-2 h-2 rounded-full bg-white/70 top-1 left-1"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default EvaChatbot;