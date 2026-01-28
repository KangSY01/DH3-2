
import React, { useState } from 'react';
import { generateBusanArt } from '../services/geminiService';
import { Sparkles, Download, Wand2 } from 'lucide-react';

const ArtistStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    const img = await generateBusanArt(prompt);
    setResultImage(img);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-800">부기 스튜디오</h2>
        <p className="text-slate-500 text-sm">여러분이 꿈꾸는 멋진 부산을 AI와 함께 그려볼까요?</p>
      </div>

      <div className="relative group">
        <div className={`aspect-square w-full rounded-[48px] overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300 transition-all ${isGenerating ? 'animate-pulse' : ''}`}>
          {resultImage ? (
            <img src={resultImage} alt="Busan Art" className="w-full h-full object-cover animate-fadeIn" />
          ) : (
            <div className="text-center p-8 space-y-4">
              <Sparkles size={48} className="mx-auto text-blue-200" />
              <p className="text-slate-400 text-sm">상상의 나래를 펼쳐보세요! 프롬프트를 입력해 볼까요?</p>
            </div>
          )}
        </div>
        {isGenerating && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center text-blue-600 font-bold rounded-[48px]">
            <Wand2 size={40} className="animate-spin mb-4" />
            부기가 정성껏 그림을 그리고 있어요!
          </div>
        )}
      </div>

      {resultImage && !isGenerating && (
        <div className="bg-[#4A90E2]/10 p-5 rounded-[32px] border border-[#4A90E2]/20 animate-slideUp">
          <p className="text-sm text-[#4A90E2] font-black italic text-center leading-relaxed">
            "정말 근사한 작품이네요! 색감이 너무 예뻐서 보고만 있어도 기분 전환이 돼요. <br/>이 멋진 작품을 친구들에게도 자랑해 볼까요?"
          </p>
        </div>
      )}

      <div className="space-y-4">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="예: 바다가 보이는 멋진 카페, 불꽃놀이가 한창인 광안리..."
          className="w-full p-5 rounded-3xl bg-slate-50 border border-slate-100 focus:ring-4 ring-blue-100 text-sm font-bold text-slate-700 outline-none"
        />
        <div className="flex gap-3">
          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className="flex-1 bg-gradient-to-r from-[#4A90E2] to-[#357ABD] text-white font-black py-5 rounded-[24px] shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
          >
            <Sparkles size={20} /> 아트 생성하기
          </button>
          {resultImage && (
            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = resultImage;
                link.download = 'boogi-art.png';
                link.click();
              }}
              className="bg-slate-800 text-white p-5 rounded-[24px] shadow-xl hover:bg-slate-900 transition-all"
            >
              <Download size={24} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {['감성적인_부산', '네온_헤운대', '광안리_노을', '기분_좋은_거리'].map(tag => (
          <button 
            key={tag}
            onClick={() => setPrompt(tag.replace('_', ' '))}
            className="text-[11px] font-black py-3 bg-white border border-slate-100 rounded-full text-slate-400 hover:text-[#4A90E2] hover:border-[#4A90E2] hover:bg-blue-50 transition-all shadow-sm"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArtistStudio;
