// src/components/MARCS.jsx
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const MARCS = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm MARCS. How can I help you today?", isUser: false }
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

  // Blinking effect for MARCS's eye
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
      // API call to match the Flask endpoint format
      const response = await axios.get('https://lab.kierz.io/', {
        params: {
          question: userMessage.text
        }
      });
      
      // Add bot response - Flask returns plain text, not JSON
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: response.data || "I'm having trouble connecting to my brain. Please try again later.",
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
          className="w-80 sm:w-96 h-[450px] bg-cyber-dark/90 backdrop-blur-md rounded-lg mb-4 flex flex-col overflow-hidden shadow-[0_0_15px_2px_rgba(191,0,255,0.5)] border border-neon-purple/50 animate-fadeIn"
        >
          {/* Chat Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 flex items-center justify-between border-b border-neon-purple/30">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-neon-purple animate-pulse"></div>
              <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue font-orbitron text-sm font-bold tracking-wider">
                MARCS
              </h3>
            </div>
            <div className="text-xs text-neon-blue/70 font-mono">v1.0.3</div>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3 bg-cyber-dark-alt/50 bg-grid-pattern">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`max-w-[85%] p-3 rounded-lg text-white text-sm animate-fadeIn
                  ${message.isUser 
                    ? 'bg-neon-blue/10 border border-neon-blue/30 self-end' 
                    : 'bg-neon-purple/10 border border-neon-purple/30 self-start'
                  }`}
              >
                <div className="flex items-start gap-2">
                  {!message.isUser && (
                    <div className="mt-1 w-2 h-2 rounded-full bg-neon-purple/80 flex-shrink-0"></div>
                  )}
                  <div className={message.isUser ? 'text-white' : 'text-neon-purple/90'}>
                    {message.text}
                  </div>
                  {message.isUser && (
                    <div className="mt-1 w-2 h-2 rounded-full bg-neon-blue/80 flex-shrink-0"></div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="max-w-[85%] p-3 rounded-lg text-white text-sm bg-neon-purple/10 border border-neon-purple/30 self-start">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className="p-3 border-t border-neon-purple/30 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask MARCS anything..."
                value={inputValue}
                onChange={handleInputChange}
                disabled={isLoading}
                className="flex-grow px-4 py-2 rounded-full border border-neon-purple/40 bg-cyber-dark-alt/80 text-white text-sm focus:outline-none focus:border-neon-purple focus:shadow-[0_0_8px_rgba(191,0,255,0.5)] transition-all duration-300"
              />
              <button 
                type="submit" 
                disabled={isLoading || !inputValue.trim()}
                className="w-10 h-10 rounded-full flex justify-center items-center bg-gradient-to-r from-neon-purple to-neon-blue text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_10px_rgba(191,0,255,0.7)] transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* MARCS Icon */}
      <div
        onClick={toggleChat}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-cyber-dark to-cyber-dark-alt flex justify-center items-center cursor-pointer shadow-[0_0_15px_rgba(191,0,255,0.6)] border-2 border-neon-purple hover:border-neon-blue overflow-hidden relative hover:scale-110 transition-all duration-300 group"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-neon-purple/20 to-neon-blue/10"></div>
        
        {/* Glowing ring */}
        <div className="absolute inset-0 rounded-full border-4 border-neon-purple/30 group-hover:border-neon-blue/30 group-hover:scale-110 transition-all duration-500"></div>
        
        {/* Eye */}
        <div
          className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue relative z-10"
          style={{
            transform: isBlinking || isLoading ? 'scaleY(0.2)' : 'scaleY(1)',
            transition: 'transform 0.2s ease'
          }}
        >
          {/* Eye pupil */}
          <div className="absolute w-5 h-5 rounded-full bg-white top-2 left-2 shadow-lg"></div>
          
          {/* Eye reflection */}
          <div className="absolute w-2 h-2 rounded-full bg-white/70 top-1 left-1"></div>
        </div>
        
        {/* M logo behind the eye */}
        <div className="absolute font-orbitron text-neon-purple/20 text-4xl font-bold opacity-30">M</div>
      </div>

      <style>{`
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default MARCS;