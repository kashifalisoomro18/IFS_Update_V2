/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { ChatMessage } from "../types";
import { MessageSquare, X, Send, Bot, Sparkles, AlertCircle } from "lucide-react";

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Assalam-o-Alaikum! Welcome to Isra Foundation Schools (IFS) Support. I'm your Virtual Admission Assistant. Ask me anything about our Admissions, Cambridge or Finland HEI Curriculums, Campus Facilities, or School Timings!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setErrorText(null);
    const userMsg: ChatMessage = { role: "user", text: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: messages.slice(1), // Exclude the first welcome message
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to receive response from system");
      }

      const data = await response.json();
      const botMsg: ChatMessage = { role: "model", text: data.text };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error: any) {
      console.error("Error communicating with AI assistant:", error);
      setErrorText("Connection slow. Let me give you standard offline guidance:");
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I'm experiencing a quick network delay. However, feel free to contact our Hyderabad administration helpline directly at +92 317 3700049 or click the WhatsApp button to speak with an agent!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend(inputValue);
    }
  };

  const QUICK_PROMPTS = [
    "What classes are open for admissions?",
    "Tell me about Finland HEI Curriculum",
    "How to apply online?",
    "What are the school timings?",
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-18 sm:right-7 z-50 flex flex-col items-end select-none">
      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] max-w-sm sm:w-96 h-[480px] max-h-[calc(100vh-100px)] bg-white border border-gray-100 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 border-t-4 border-primary animate-fadeIn">
          {/* Header */}
          <div className="bg-slate-950 text-white px-4 py-3 flex justify-between items-center border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-primary tracking-wide">
                  IFS AI Assistant
                </h4>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-gray-400 font-medium">Online Helpdesk</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white hover:bg-slate-900 p-1 rounded-full transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages List Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 custom-scrollbar">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
              >
                {msg.role !== "user" && (
                  <div className="w-6 h-6 rounded-md bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-slate-700" />
                  </div>
                )}
                <div
                  className={`rounded-xl p-3 text-xs leading-relaxed whitespace-pre-wrap ${msg.role === "user"
                    ? "bg-primary text-slate-950 font-medium rounded-tr-none"
                    : "bg-white text-slate-800 shadow-sm border border-gray-100 rounded-tl-none"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 max-w-[85%] mr-auto items-center">
                <div className="w-6 h-6 rounded-md bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-slate-700" />
                </div>
                <div className="bg-white rounded-xl p-3 text-xs shadow-sm border border-gray-100 rounded-tl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            {errorText && (
              <div className="flex gap-1.5 items-center text-[10px] text-primary-dark bg-primary/10 p-2 rounded-lg border border-primary/20">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errorText}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips */}
          <div className="p-2.5 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto scrollbar-none custom-scrollbar select-none">
            {QUICK_PROMPTS.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="text-[10px] bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full border border-gray-200 hover:border-gray-300 transition-colors flex-shrink-0 cursor-pointer font-medium disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Panel */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Type your question..."
              className="flex-1 bg-gray-50 hover:bg-gray-100/70 focus:bg-white text-xs border border-gray-200 focus:border-primary focus:outline-none rounded-xl px-3 py-2.5 transition-colors text-slate-900 placeholder-gray-400"
            />
            <button
              onClick={() => handleSend(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              className="bg-slate-950 hover:bg-slate-900 text-primary p-2.5 rounded-xl transition-all shadow hover:shadow-md cursor-pointer disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Sparkly Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-950 hover:bg-slate-900 text-primary w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 border-2 border-primary/50 relative group cursor-pointer"
        aria-label="IFS Virtual Assistant"
        id="ai-chatbot-floating-trigger"
      >
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        ) : (
          <>
            <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <Sparkles className="w-3.5 h-3.5 text-secondary absolute -top-1 -right-1 animate-pulse" />
          </>
        )}
        <span className="absolute right-14 sm:right-16 bg-slate-900 text-primary text-[10px] font-bold px-2 py-1 rounded shadow-lg border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden sm:block">
          Ask IFS Assistant
        </span>
      </button>
    </div>
  );
}
