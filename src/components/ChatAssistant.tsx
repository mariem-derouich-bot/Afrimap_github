import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, Sparkles, AlertCircle } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

interface ChatContext {
  country: string;
  region?: string;
  city?: string;
  resource?: string;
  category?: string;
}

interface ChatAssistantProps {
  onClose?: () => void;
  selectedCountry: { name: string; id: string; flag: string };
  chatContext?: ChatContext | null;
}

export default function ChatAssistant({ onClose, selectedCountry, chatContext }: ChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggested preset questions dynamic template based on the active country
  const PRESET_PROMPTS = [
    `What is the best investment sector in ${selectedCountry.name}?`,
    `I have a budget of $300,000. Where should I invest in ${selectedCountry.name}?`,
    `What resources can I leverage for a venture in ${selectedCountry.name}?`,
    `What are the logistics and shipping links for ${selectedCountry.name}?`
  ];

  // Initialize the chat with a localized message whenever the active country changes
  useEffect(() => {
    setMessages([
      {
        role: "model",
        text: `Hello! Welcome to AFRIMAP, your continental investment portal. I am your specialized AI Concierge for ${selectedCountry.flag} ${selectedCountry.name}.\n\nHow can I help you analyze key regional hubs, tax structures, logistics, or match high-performing investment opportunities in ${selectedCountry.name} today?`
      }
    ]);
  }, [selectedCountry]);

  // Handle active geographic context change from map interactions
  useEffect(() => {
    if (chatContext) {
      let entityName = "";
      let detailString = "";
      if (chatContext.resource) {
        entityName = `${chatContext.resource} (${chatContext.category || "Resource"})`;
        detailString = `the ${chatContext.resource} resource in the ${chatContext.region || ""} region`;
      } else if (chatContext.city) {
        entityName = `${chatContext.city} City`;
        detailString = `the city of ${chatContext.city} (located in ${chatContext.region || ""})`;
      } else if (chatContext.region) {
        entityName = `${chatContext.region} Governorate`;
        detailString = `the ${chatContext.region} governorate`;
      }

      const welcomeMsg = `[Context Update] I see you are exploring **${entityName}** on the map.\n\nLet's analyze the specific investment opportunities, logistics advantages, and FDI incentives for ${detailString} in ${chatContext.country}. Ask me anything about this target!`;

      // Append context message
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: welcomeMsg
        }
      ]);
    }
  }, [chatContext]);

  // Auto scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setError(null);
    const userMessage: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Keep only last 10 messages for prompt history optimization
      const history = messages.slice(-10);

      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: textToSend, 
          history,
          country: selectedCountry.name,
          context: chatContext
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to contact chat model");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "model", text: data.text }]);
    } catch (err: any) {
      console.error("Chat Error:", err);
      setError(err.message || "An error occurred. Please verify your GEMINI_API_KEY in Settings > Secrets.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage(input);
    }
  };

  return (
    <div id="ai-chat-assistant-panel" className="bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col h-[520px] shadow-2xl backdrop-blur-md">
      
      {/* Banner / Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600">
              <Bot className="h-4.5 w-4.5 animate-pulse" />
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1">
              {selectedCountry.name} AI Advisor
              <Sparkles className="h-3 w-3 text-emerald-600" />
            </h4>
            <p className="text-[10px] text-slate-500 font-mono">Pan-African Investment Concierge</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-150 rounded-lg text-slate-400 hover:text-slate-800 transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 font-sans">
        {messages.map((msg, index) => {
          const isModel = msg.role === "model";
          return (
            <div key={index} className={`flex ${isModel ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs whitespace-pre-wrap leading-relaxed ${
                isModel 
                  ? "bg-white text-slate-800 border border-slate-200" 
                  : "bg-emerald-600 text-white font-medium animate-fade-in"
              }`}>
                {msg.text}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              <span>Analyzing country metrics...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-2 text-[10px] text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Preset suggestion chips */}
      {messages.length === 1 && (
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-150">
          <p className="text-[9px] uppercase tracking-wider font-semibold text-slate-500 font-mono mb-1.5">Suggested Questions</p>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(prompt)}
                className="text-[10px] text-left bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition duration-100 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Tray */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={`Ask about budgets, hubs, and laws in ${selectedCountry.name}...`}
          className="flex-1 bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-emerald-500 transition font-sans"
          disabled={loading}
        />
        <button
          onClick={() => sendMessage(input)}
          className="p-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-xl transition duration-150 cursor-pointer"
          disabled={!input.trim() || loading}
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>

    </div>
  );
}
