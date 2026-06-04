'use client';

import React from 'react';
import { MessageSquare, X, Send, Compass, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatAi } from '../hooks/useChatAi';

export default function TravelGptChat() {
  const {
    isOpen,
    setIsOpen,
    messages,
    inputText,
    setInputText,
    isTyping,
    chatBottomRef,
    handleOpenChat,
    handleSendMessage,
    handleMessageContainerClick
  } = useChatAi();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {/* Floating Toggle Button */}
        {!isOpen && (
          <motion.button
            onClick={handleOpenChat}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: [0, -6, 0]
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              },
              scale: { duration: 0.2 },
              opacity: { duration: 0.2 }
            }}
            whileHover={{ scale: 1.1 }}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-brand-accent to-brand-primary text-white flex items-center justify-center shadow-[0_8px_32px_rgba(37,99,235,0.35)] border border-white/10 cursor-pointer"
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Chat Window Panel */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-0 right-0 w-[350px] h-[480px] bg-white dark:bg-brand-primary-light rounded-2xl shadow-2xl border border-brand-border dark:border-gray-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-primary to-brand-primary-light dark:from-[#0d1b3e] dark:to-[#1e293b] text-white px-5 py-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
                <div>
                  <h4 className="text-white text-sm font-extrabold leading-none mb-1">FlyEz Travel Agent</h4>
                  <span className="text-[10px] text-white/60 font-semibold">AI Assistant & Routing Support</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Wrapper Area */}
            <div 
              onClick={handleMessageContainerClick}
              className="flex-1 p-5 overflow-y-auto bg-slate-50 dark:bg-brand-primary flex flex-col gap-4 scrollbar-none"
            >
              {messages.map((msg) => {
                const isAgent = msg.sender === 'agent';
                return (
                  <div 
                    key={msg.id}
                    className={`flex items-end gap-2 max-w-[85%] ${isAgent ? 'self-start' : 'self-end'}`}
                  >
                    {isAgent && (
                      <div className="w-7 h-7 rounded-full bg-brand-accent text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Compass size={14} className="animate-spin-slow" />
                      </div>
                    )}
                    <div 
                      dangerouslySetInnerHTML={{ __html: msg.html }}
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm border ${
                        isAgent 
                          ? 'bg-white dark:bg-brand-primary-light text-brand-text-main dark:text-white/90 border-brand-border dark:border-gray-800 rounded-bl-sm' 
                          : 'bg-brand-accent text-white border-transparent rounded-br-sm'
                      }`}
                    />
                    {!isAgent && (
                      <div className="w-7 h-7 rounded-full bg-brand-primary dark:bg-brand-primary-light text-white flex items-center justify-center shrink-0 border dark:border-gray-800">
                        <User size={14} />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing indicator bubble */}
              {isTyping && (
                <div className="flex items-center gap-2 self-start">
                  <div className="w-7 h-7 rounded-full bg-brand-accent text-white flex items-center justify-center shrink-0">
                    <Compass size={14} />
                  </div>
                  <div className="px-4 py-3 bg-white dark:bg-brand-primary-light border border-brand-border dark:border-gray-800 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-brand-text-muted dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-brand-text-muted dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-brand-text-muted dark:bg-gray-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Form input footer */}
            <form 
              onSubmit={handleSendMessage}
              className="flex p-3 bg-white dark:bg-brand-primary-light border-t border-brand-border dark:border-gray-800 items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask a flight query..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 border-0 outline-none text-sm px-2 py-1.5 bg-transparent text-brand-primary dark:text-white placeholder-brand-text-muted dark:placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  inputText.trim() 
                    ? 'bg-brand-accent text-white cursor-pointer hover:scale-105' 
                    : 'bg-slate-100 dark:bg-brand-primary text-brand-text-muted dark:text-gray-400'
                }`}
              >
                <Send size={14} className={inputText.trim() ? "translate-x-0.5" : ""} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
