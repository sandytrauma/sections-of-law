"use client";
import React, { useState } from 'react'
import Tooltip from './Tooltip';

type Message = string;

const ChatBot: React.FC = () => {

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [isPrompting, setIsPrompting] = useState(false);

    const handleSend = () => {
        const userMessage = `User: ${input}`;


        setMessages(prevMessages => [...prevMessages, userMessage]);

        // Handle special cases and prompts
        if (input.toLowerCase() === "hi") {
            // Clear all messages and prompt the user
            setMessages(["System: Hello! Please provide your name!"]);
            setIsPrompting(true);
        } else if (input.toLowerCase() === "clear") {
            // Clear all messages
            setMessages([]);
            setIsPrompting(false);
        } else {
            // Continue the conversation or provide a generic response
            if (isPrompting) {

                setMessages(prevMessages => [...prevMessages, `System: Hello "${input}". Can you provide more details? like what is your purpose to be here on this website`]);
                setIsPrompting(false);

            }
        }

        // Clear the input field
        setInput('');
    };

    return (
        <div className="flex flex-col items-center justify-center float-end p-4">
            <Tooltip text="This chatbot is experimental and still being worked on.">
                <span>🛠️</span>
            </Tooltip>
            <div className="w-full md:w-full max-w-sm shadow-lg rounded-lg bg-orange-100 p-6">
                <div className="space-y-4 max-h-60 p-2 m-2 bg-gray-50 border border-gray-200 rounded-md">
                    {messages.map((msg, index) => (
                        <div key={index} className="text-sm text-gray-700">
                            {msg}
                        </div>
                    ))}
                </div>
                <div className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex md:flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-gray-700 focus:outline-none w-full md:w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={handleSend}
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatBot
