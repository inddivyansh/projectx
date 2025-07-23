import { useState, useEffect, useRef } from 'react';
import React from "react";

const CHATBOT_NAME = 'DN_Bot';

// IMPORTANT: Move this to a secure backend for production!
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''; // Use environment variable

interface GeminiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

type Message = {
  role: 'user' | 'model';
  text: string;
};

const GeminiChatbot: React.FC<GeminiChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // This is the context that will be sent to the AI to guide its responses.
  const portfolioContext = `
    You are an expert assistant for Divyansh Nagar's personal portfolio. 
    Your primary goal is to help users learn about his skills, projects, and professional background. 
    Maintain a friendly, helpful, and professional tone.

    Key Information:
    - Name: Divyansh Nagar
    - GitHub: https://github.com/inddivyansh

    Featured Project:
    - Project Name: Divyansh Nagar's Portfolio
    - Description: A personal portfolio showcasing Divyansh's skills, projects, and experience.
    - Description: This is a significant project. You should encourage users to ask about it.
    - Link: https://github.com/inddivyansh/projectx

    When a user asks a question, use this information to provide accurate and relevant answers.
    You can suggest questions to the user to guide them, such as:
    - "What are Divyansh's main technical skills?"
    - "Can you tell me more about Divyansh Nagar's Portfolio?"
    - "What kind of technologies does Divyansh use in his projects?"
  `;

  // Set the initial welcome message when the chatbot opens
  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          role: 'model',
          text: "Hi! Welcome to Divyansh Nagar's Portfolio Chatbot."
        },
        {
          role: 'model',
          text: "How may I assist you today? You can ask me about his projects, skills, or experience."
        }
      ]);
    }
  }, [isOpen]);
  
  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: 'model', text: data.text }]);
      } else {
        setError(data.error || 'Sorry, something went wrong. Please try again.');
      }
    } catch (e) {
      setError('Sorry, something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white dark:bg-[#232f3e] rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-marrsgreen dark:hover:text-carrigreen"
          onClick={onClose}
          aria-label="Close Chatbot"
        >
          ×
        </button>
        {/* Your chatbot UI here */}
        <h2 className="text-xl font-bold mb-4">{CHATBOT_NAME}</h2>
        {/* Chat messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-3 space-y-2"
        >
          {messages.map((msg: Message, index: number) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-marrsgreen text-white' : 'bg-white dark:bg-[#202c39]'}`}>
                {/* A simple way to render text with newlines */}
                {msg.text.split('\n').map((line: string, i: number) => <p key={i}>{line}</p>)}
              </div>
            </div>
          ))}
          {isLoading && <div className="flex justify-start"><div className="px-3 py-2 rounded-lg bg-white dark:bg-[#202c39]">...</div></div>}
          {error && <div className="text-red-500 text-sm p-2">{error}</div>}
        </div>
        {/* Input box */}
        <div className="p-3 border-t border-gray-300 dark:border-gray-700 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 rounded-md bg-white dark:bg-[#202c39] border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-marrsgreen"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="ml-2 px-4 py-2 rounded-md bg-marrsgreen text-white font-semibold disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiChatbot;
