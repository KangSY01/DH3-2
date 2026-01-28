
import React, { useState } from 'react';
import { FOOD_WORLD_CUP_ITEMS } from '../constants';
import { FoodItem } from '../types';
import { Heart, Info, RefreshCw, Star, MapPin } from 'lucide-react';

const FoodWorldCup: React.FC = () => {
  const [items, setItems] = useState<FoodItem[]>(FOOD_WORLD_CUP_ITEMS);
  const [winners, setWinners] = useState<FoodItem[]>([]);
  const [currentMatch, setCurrentMatch] = useState<[FoodItem, FoodItem] | null>([items[0], items[1]]);
  const [round, setRound] = useState(1);
  const [finalWinner, setFinalWinner] = useState<FoodItem | null>(null);

  const selectWinner = (winner: FoodItem) => {
    const nextWinners = [...winners, winner];
    setWinners(nextWinners);

    const nextIdx = (winners.length + 1) * 2;
    if (nextIdx < items.length) {
      setCurrentMatch([items[nextIdx], items[nextIdx + 1]]);
    } else {
      if (nextWinners.length === 1) {
        setFinalWinner(nextWinners[0]);
      } else {
        setItems(nextWinners);
        setWinners([]);
        setCurrentMatch([nextWinners[0], nextWinners[1]]);
        setRound(r => r + 1);
      }
    }
  };

  const reset = () => {
    setItems(FOOD_WORLD_CUP_ITEMS);
    setWinners([]);
    setCurrentMatch([FOOD_WORLD_CUP_ITEMS[0], FOOD_WORLD_CUP_ITEMS[1]]);
    setRound(1);
    setFinalWinner(null);
  };

  if (finalWinner) {
    return (
      <div className="space-y-8 text-center animate-fadeIn py-10">
        <div className="relative inline-block group">
          <div className="absolute -inset-8 bg-[#F5A623] blur-3xl opacity-30 animate-pulse rounded-full"></div>
          <div className="relative">
            <img 
                src={finalWinner.image} 
                alt={finalWinner.name} 
                className="w-72 h-72 object-cover rounded-[72px] border-[10px] border-white shadow-2xl" 
            />
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#F5A623] text-white font-black px-10 py-3 rounded-full shadow-2xl border-4 border-white uppercase tracking-widest text-sm">
              우승! 👑
            </div>
          </div>
        </div>
        
        <div className="space-y-6 max-w-lg mx-auto">
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter">{finalWinner.name}</h2>
          <div className="bg-white text-slate-800 p-8 rounded-[48px] text-left space-y-5 shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
                 <Star size={100} fill="black" />
            </div>
            <h4 className="font-black text-[#F5A623] flex items-center gap-2 uppercase tracking-tight text-sm"><Info size={20} /> 부기의 꿀팁</h4>
            <p className="text-base text-slate-600 leading-relaxed font-bold italic">"{finalWinner.tips}"</p>
            <div className="pt-6 border-t border-slate-50 flex items-center gap-3">
               <MapPin size={18} className="text-[#4A90E2]" />
               <span className="text-sm font-black text-slate-400">부산 최고의 핫플레이스 선정 완료!</span>
            </div>
          </div>
        </div>

        <button 
          onClick={reset}
          className="bg-[#4A90E2] text-white px-12 py-5 rounded-[28px] font-black flex items-center gap-3 mx-auto hover:bg-[#357ABD] transition-all shadow-2xl active:scale-95"
        >
          <RefreshCw size={24} /> 다시 하기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-4 animate-fadeIn">
      <div className="flex items-center justify-between text-[12px] font-black text-slate-400 uppercase tracking-widest px-2">
        <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#4A90E2] rounded-full animate-ping"></div>
            결승전 라운드 {round}
        </div>
        <div className="bg-slate-100 px-5 py-2 rounded-full border border-slate-200">
            진행도: {winners.length + 1} / {items.length / 2}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {currentMatch?.map((item) => (
          <div 
            key={item.id}
            onClick={() => selectWinner(item)}
            className="group relative h-72 rounded-[48px] overflow-hidden cursor-pointer shadow-xl border-[4px] border-transparent hover:border-[#F5A623] transition-all duration-500 active:scale-95"
          >
            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-8 group-hover:from-black/90 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-black bg-[#4A90E2] text-white px-4 py-1.5 rounded-full uppercase tracking-widest">{item.category}</span>
                <span className="flex items-center gap-1.5 text-[10px] font-black text-[#F5A623] drop-shadow-md"><MapPin size={12} /> BUSAN</span>
              </div>
              <h3 className="text-3xl font-black text-white tracking-tighter mb-1">{item.name}</h3>
              <p className="text-sm text-white/70 font-bold italic line-clamp-1">"{item.tagline}"</p>
            </div>
            
            <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md p-4 rounded-[24px] opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
              <Heart className="text-white fill-white" size={32} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodWorldCup;
