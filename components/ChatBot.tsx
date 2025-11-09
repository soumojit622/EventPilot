"use client";

import { useState, useEffect, useRef } from "react";
import { Send, X } from "lucide-react";
import Image from "next/image";

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [
      {
        role: "assistant",
        content: "Hello! How can I assist you with EventPilot today?",
      },
    ]
  );

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const showTimer = setTimeout(() => setTooltipVisible(true), 2000);
    const hideTimer = setTimeout(() => setTooltipVisible(false), 8000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);

    const question = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Sorry, I couldn't generate a response.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again later.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button + Tooltip */}
      {!open && (
        <div className="fixed bottom-24 right-7 z-50 flex flex-col items-center space-y-2">
          {tooltipVisible && (
            <div className="relative bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-gray-200 dark:border-neutral-700 px-4 py-2 rounded-2xl shadow-lg text-sm text-gray-700 dark:text-gray-200 w-64 text-center">
              <span>Hi there! Need help with EventPilot?</span>
              <button
                onClick={() => setTooltipVisible(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-white transition"
              >
                <X size={14} />
              </button>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-neutral-900 rotate-45 shadow"></div>
            </div>
          )}

          <button
            onClick={() => setOpen(true)}
            className="rounded-full shadow-xl p-1 hover:scale-110 duration-200 ring-2 ring-indigo-500/30"
            title="Chat with EventPilot"
          >
            <Image
              src="/chatbot.png"
              width={60}
              height={60}
              alt="chatbot"
              className="rounded-full border-2 border-white shadow-md"
            />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-40 right-8 w-96 max-h-[520px] bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-gray-200 dark:border-neutral-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-bottom">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-600 to-pink-500">
            <div className="flex items-center gap-2">
              <Image
                src="/chatbot.png"
                width={30}
                height={30}
                alt="bot avatar"
                className="rounded-full border border-white"
              />
              <p className="text-white text-sm font-medium">
                EventPilot Support
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-full transition"
            >
              <X size={16} className="text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-4 py-2 rounded-2xl shadow ${
                  m.role === "user"
                    ? "ml-auto bg-indigo-500 text-white"
                    : "bg-gray-100 dark:bg-neutral-700 text-gray-900 dark:text-white"
                }`}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <div className="flex gap-1 w-fit px-3 py-1 text-xs rounded-md bg-gray-100 dark:bg-neutral-700 text-gray-500 animate-pulse">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/90 flex gap-2">
            <input
              className="flex-1 px-4 py-2 text-sm rounded-full border border-gray-300 dark:border-neutral-600 bg-gray-50 dark:bg-neutral-800 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Ask about EventPilot..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full shadow transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
