import React, { useState, useEffect, useRef } from 'react';
import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';

export interface Message {
  id: string;
  sender: 'agent' | 'user';
  html: string;
  text?: string;
}

export function useChatAi() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Load initial welcome message from backend when chat opens
  const handleOpenChat = async () => {
    setIsOpen(true);
    if (hasInitialized) return;

    setIsTyping(true);
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.CHAT.TRAVEL_GPT,
        new URLSearchParams({ val: '1' }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      
      setMessages([{ id: 'init', sender: 'agent', html: response.data }]);
      setHasInitialized(true);
    } catch (err) {
      console.error('Travel GPT initial message error:', err);
      // Fallback message if server fails
      setMessages([{ 
        id: 'init', 
        sender: 'agent', 
        html: '<div class="direct-chat-text">Hello! I am your FlyEz Assistant. How can I help you book your flights today?</div>' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Submit a chat message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setInputText('');
    
    // Add user message to UI
    const tempUserMsgId = `user-${Date.now()}`;
    const formattedUserHtml = `<div class="direct-chat-text">${userMsg}</div>`;
    setMessages(prev => [...prev, { id: tempUserMsgId, sender: 'user', html: formattedUserHtml, text: userMsg }]);

    setIsTyping(true);
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.CHAT.TRAVEL_GPT,
        new URLSearchParams({ val: '2', msg: userMsg }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      
      setMessages(prev => [...prev, { id: `agent-${Date.now()}`, sender: 'agent', html: response.data }]);
    } catch (err) {
      console.error('Travel GPT response error:', err);
      setMessages(prev => [...prev, { 
        id: `err-${Date.now()}`, 
        sender: 'agent', 
        html: '<div class="direct-chat-text" style="color: #991b1b">Sorry, I had trouble reaching the server. Please call us at 1800-521-4263 for direct booking support.</div>' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Trigger special options (like confirm options or end conversation calls)
  const handleActionClick = async (actionVal: number, userText: string) => {
    setIsTyping(true);
    
    // Append action text to list
    setMessages(prev => [...prev, { 
      id: `user-act-${Date.now()}`, 
      sender: 'user', 
      html: `<div class="direct-chat-text">${userText}</div>` 
    }]);

    try {
      const response = await apiClient.post(
        API_ENDPOINTS.CHAT.TRAVEL_GPT,
        new URLSearchParams({ val: String(actionVal) }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      setMessages(prev => [...prev, { id: `agent-${Date.now()}`, sender: 'agent', html: response.data }]);
    } catch (err) {
      console.error('Travel GPT action error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  // Custom click interceptor to catch any embedded button selectors in the returned HTML (like .cnf or .end classes)
  const handleMessageContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('cnf')) {
      handleActionClick(3, 'Thanks, I confirm this');
    } else if (target.classList.contains('end')) {
      handleActionClick(4, 'Thanks');
    }
  };

  return {
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
  };
}
