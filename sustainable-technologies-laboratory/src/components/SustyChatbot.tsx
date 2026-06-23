import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  CornerDownLeft, 
  Award, 
  BookOpen, 
  Tv, 
  HelpCircle 
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

// Custom simple parser to format bold "**text**" and basic list lines or URLs beautifully
function formatMessageContent(text: string) {
  const lines = text.split("\n");
  return lines.map((line, idx) => {
    let cleanLine = line.trim();
    
    // Check if line is a bullet point
    const isBullet = cleanLine.startsWith("* ") || cleanLine.startsWith("- ") || cleanLine.startsWith("• ");
    if (isBullet) {
      cleanLine = cleanLine.replace(/^[*•-]\s+/, "");
    }

    // Replace **bold** with <strong> elements
    const parts = [];
    let currentText = cleanLine;
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;
    let lastIndex = 0;

    while ((match = boldRegex.exec(currentText)) !== null) {
      if (match.index > lastIndex) {
        parts.push(currentText.substring(lastIndex, match.index));
      }
      parts.push(
        <strong key={match.index} className="font-extrabold text-[#0c2340]">
          {match[1]}
        </strong>
      );
      lastIndex = boldRegex.lastIndex;
    }
    if (lastIndex < currentText.length) {
      parts.push(currentText.substring(lastIndex));
    }

    if (isBullet) {
      return (
        <li key={idx} className="ml-4 list-disc text-xs sm:text-sm text-slate-700 leading-relaxed my-1 font-sans">
          {parts.length > 0 ? parts : cleanLine}
        </li>
      );
    }

    return (
      <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed my-1.5 font-sans break-words">
        {parts.length > 0 ? parts : cleanLine}
      </p>
    );
  });
}

export default function SustyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I am Susty, your STLab AI assistant. 🧪🍃\n\nAsk me anything about our energy systems research, Life Cycle Assessments (LCA), Techno-Economic Analysis (TEA), or we can talk about Prof. Ganti S. Murthy and our amazing students like Buddhodev Ghosh and Dagguganta Mohan Chaitanya Reddy!"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    { text: "What is STLab and what do you study?", icon: <Sparkles className="h-3 w-3" /> },
    { text: "Tell me about Prof. Ganti S. Murthy", icon: <BookOpen className="h-3 w-3" /> },
    { text: "What are the latest laboratory news?", icon: <Award className="h-3 w-3" /> },
    { text: "Learn about traditional knowledge integration", icon: <HelpCircle className="h-3 w-3" /> }
  ];

  // Auto scroll to bottom when message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = { role: "user", text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setErrorNotice(null);

    try {
      // Build history for backend chat context
      // Limit to last 6 messages to keep payloads optimized
      const chatHistory = messages
        .slice(-6)
        .map(msg => ({
          role: msg.role === "user" ? "user" : "model",
          text: msg.text
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory
        })
      });

      if (!response.ok) {
        throw new Error("Local server reported an error communicating with Gemini.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.details || data.error);
      }

      setMessages(prev => [...prev, { role: "assistant", text: data.text }]);
    } catch (err: any) {
      console.error(err);
      setErrorNotice(err.message || "An unexpected issue occurred.");
      setMessages(prev => [
        ...prev, 
        { 
          role: "assistant", 
          text: "⚠️ Sorry, I encountered an issue connecting to my brain. Please make sure the GEMINI_API_KEY is configured in Settings > Secrets." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Floating Action Button */}
      <motion.button
        id=" chatbot-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="h-14 w-14 rounded-full bg-linear-to-r from-[#0c2340] to-st-orange text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow cursor-pointer relative group-hover:scale-105"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative flex items-center justify-center w-full h-full"
            >
              <Bot className="h-6 w-6 text-white" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-st-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ffa34d]"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Embedded Chat Layout Pane */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: -16, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="absolute bottom-16 right-0 w-[92vw] sm:w-[410px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#0c2340] px-5 py-4 text-white flex justify-between items-center relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 h-28 w-28 bg-gradient-to-br from-st-orange/20 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/15 backdrop-blur-md">
                  <Bot className="h-5 w-5 text-st-orange animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold tracking-wide text-white">Susty Assistant</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-st-green animate-ping" />
                    <span className="text-[10px] text-slate-300 font-semibold tracking-wider uppercase">STLab Knowledge Base</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-slate-300 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Warning if API key is not supplied */}
            {errorNotice && (
              <div className="bg-amber-50 border-b border-amber-100 text-[11px] text-amber-800 px-4 py-2 font-medium flex items-center justify-between">
                <span>{errorNotice}</span>
                <button onClick={() => setErrorNotice(null)} className="text-amber-500 hover:text-amber-700">
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`p-4 rounded-2xl max-w-[85%] ${
                    msg.role === "user" 
                      ? "bg-gradient-to-r from-[#0c2340] to-slate-800 text-white rounded-br-none shadow-md" 
                      : "bg-white border border-slate-100 text-slate-800 rounded-bl-none shadow-xs"
                  }`}>
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-1 mb-1.5 text-[9px] font-bold uppercase tracking-wider text-st-orange">
                        <Sparkles className="h-2.5 w-2.5" />
                        <span>Susty AI</span>
                      </div>
                    )}
                    <div className="space-y-1">
                      {formatMessageContent(msg.text)}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-bl-none shadow-xs max-w-[85%] flex items-center gap-2">
                    <span className="text-xs text-slate-450 font-medium">Susty is weaving a response</span>
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 bg-st-orange rounded-full animate-bounce delay-75" />
                      <span className="h-1.5 w-1.5 bg-[#0c2340] rounded-full animate-bounce delay-150" />
                      <span className="h-1.5 w-1.5 bg-st-green rounded-full animate-bounce delay-225" />
                    </span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips (only show when not busy) */}
            {!isLoading && messages.length <= 2 && (
              <div className="px-4 py-2 bg-slate-50/30 border-t border-slate-100/50 flex flex-nowrap gap-2 overflow-x-auto shrink-0 select-none scrollbar-none scroll-smooth">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q.text)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-150 rounded-full text-xs text-slate-600 hover:border-st-orange/40 hover:text-st-orange transition-all tracking-wide whitespace-nowrap cursor-pointer shrink-0"
                  >
                    {q.icon}
                    <span>{q.text}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Send Message Footer */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-slate-100 bg-white flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Susty a question..."
                className="flex-1 bg-slate-50 border border-slate-200 focus:border-st-orange/50 focus:bg-white rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-hidden text-slate-800 transition-colors placeholder-slate-400"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className={`p-2.5 rounded-xl flex items-center justify-center transition-colors shadow-xs ${
                  inputValue.trim() && !isLoading
                    ? "bg-[#0c2340] hover:bg-st-orange text-white cursor-pointer"
                    : "bg-slate-100 text-slate-350 cursor-not-allowed"
                }`}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
