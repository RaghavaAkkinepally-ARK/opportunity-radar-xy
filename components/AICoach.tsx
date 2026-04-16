"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: 'bot' | 'user';
  content: string;
}

export function AICoach() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', content: "Hello! I'm your AI Career Coach. How can I help you today? You can ask me things like 'What should I do today?' or 'How do I improve my resume?'" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'bot', 
        content: `That's a great question about ${input.slice(0, 10)}... Based on your profile, I recommend focusing on building a strong portfolio project using Next.js and Tailwind CSS this week. This will boost your match score for Frontend roles by 15%.`
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-2xl overflow-hidden bg-white/50 dark:bg-black/20 backdrop-blur-xl">
      <div className="p-4 border-b flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <Bot size={18} />
        </div>
        <h2 className="font-bold flex items-center gap-2">
          AI Career Coach <Sparkles size={16} className="text-yellow-500" />
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "max-w-[80%] p-3 rounded-2xl text-sm",
                msg.role === 'user' 
                  ? "ml-auto bg-blue-600 text-white rounded-br-none" 
                  : "bg-gray-100 dark:bg-gray-800 rounded-bl-none text-gray-800 dark:text-gray-200"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                {msg.role === 'bot' ? <Bot size={14} /> : <User size={14} />}
                <span className="text-[10px] font-bold uppercase opacity-50">
                  {msg.role === 'bot' ? 'Coach' : 'You'}
                </span>
              </div>
              {msg.content}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask your coach..."
          className="flex-1 bg-gray-100 dark:bg-gray-800 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
