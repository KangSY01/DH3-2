
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, GroundingSource } from '../types';
import { generateBoogiResponse } from '../services/geminiService';
import { Send, User, Sparkles, ExternalLink, Info } from 'lucide-react';

const BoogiBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'boogi', 
      text: "반가워요! 오늘 부산 여행은 부기만 믿으라구! 정말 멋진 추천 장소들이 기다리고 있어요. 어디가 궁금하신가요? 사진 잘 나오는 카페? 아님 맛있는 간식집?", 
      timestamp: Date.now() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    const result = await generateBoogiResponse(input);
    const boogiMsg: ChatMessage = { role: 'boogi', text: result.text, sources: result.sources, timestamp: Date.now() };
    setMessages(prev => [...prev, boogiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[600px] space-y-4">
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-[28px] shadow-sm transition-all ${
              msg.role === 'user' 
                ? 'bg-[#4A90E2] text-white rounded-br-none shadow-blue-200 shadow-md' 
                : 'bg-slate-50 text-slate-800 rounded-bl-none border border-slate-100'
            }`}>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase opacity-60 tracking-widest">
                {msg.role === 'boogi' ? <Sparkles size={12} className="text-[#F5A623]" /> : <User size={12} />}
                {msg.role === 'boogi' ? 'Boogi Live' : 'You'}
              </div>
              <p className="text-sm leading-relaxed font-bold whitespace-pre-wrap">{msg.text}</p>
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-5 pt-4 border-t border-slate-200">
                  <p className="text-[10px] font-black text-[#4A90E2] mb-3 flex items-center gap-1 uppercase tracking-widest">
                    <Info size={12}/> Sources from Google
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {msg.sources.map((source, idx) => (
                      <a key={idx} href={source.uri} target="_blank" rel="noopener noreferrer" className="text-[11px] text-slate-500 hover:text-[#4A90E2] bg-white p-2.5 rounded-xl flex items-center justify-between group transition-all border border-slate-100 shadow-sm">
                        <span className="truncate max-w-[220px] font-bold">{source.title}</span>
                        <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-50 p-5 rounded-[28px] animate-pulse flex gap-2 border border-slate-100">
              <div className="w-2 h-2 bg-[#4A90E2] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#4A90E2] rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-[#4A90E2] rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 bg-slate-100 p-4 rounded-[32px] border-2 border-transparent focus-within:border-[#4A90E2] focus-within:bg-white transition-all shadow-inner">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="부산의 인기 명소를 물어보세요! (예: 해운대 맛집 알려줘)"
          className="flex-1 bg-transparent border-none focus:outline-none px-2 text-sm font-black text-slate-700 placeholder:text-slate-300"
        />
        <button onClick={handleSend} disabled={isLoading} className="bg-[#4A90E2] text-white p-3.5 rounded-2xl hover:bg-[#357ABD] transition-all shadow-lg active:scale-90 disabled:opacity-50">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default BoogiBot;
