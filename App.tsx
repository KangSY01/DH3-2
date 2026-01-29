
import React, { useState } from 'react';
import { AppTab } from './types';
import BoogiBot from './components/BoogiBot';
import Quiz from './components/Quiz';
import ArtistStudio from './components/ArtistStudio';
import FoodWorldCup from './components/FoodWorldCup';
import TrendGrid from './components/TrendGrid';
import { 
  Waves,
  Search,
  Sparkles,
  Trophy,
  MapPin,
  Palette,
  MessageCircle,
  LayoutDashboard,
  ArrowRight
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);

  const menuItems = [
    { tab: AppTab.DASHBOARD, label: "홈", icon: <LayoutDashboard size={20}/> },
    { tab: AppTab.CHAT, label: "어디가노", icon: <MessageCircle size={20}/> },
    { tab: AppTab.QUIZ, label: "퀴즈한바퀴", icon: <MapPin size={20}/> },
    { tab: AppTab.ART, label: "부기스튜디오", icon: <Palette size={20}/> },
    { tab: AppTab.FOOD, label: "맛집월드컵", icon: <Trophy size={20}/> },
  ];

  const getPageTitle = (tab: AppTab) => {
    switch (tab) {
      case AppTab.CHAT: return "어디가노";
      case AppTab.QUIZ: return "퀴즈한바퀴";
      case AppTab.ART: return "부기스튜디오";
      case AppTab.FOOD: return "FOOD 월드컵";
      default: return tab;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd] text-slate-800">
      {/* Top Navigation - PC Style Optimized */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-slate-100 px-8 lg:px-20 py-6 sticky top-0 z-50 flex items-center justify-between shadow-sm">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActiveTab(AppTab.DASHBOARD)}
        >
          <div className="bg-[#4A90E2] p-2.5 rounded-2xl shadow-xl group-hover:rotate-12 transition-all group-hover:scale-110">
            <Waves className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900 italic uppercase bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-[#4A90E2]">BOOGI WAVE</h1>
        </div>

        {/* Desktop Menu - Central Hub */}
        <nav className="hidden lg:flex items-center gap-2 p-1.5 bg-slate-100 rounded-[32px]">
          {menuItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`flex items-center gap-2.5 px-8 py-3.5 rounded-full font-black text-sm transition-all duration-300 ${
                activeTab === item.tab 
                  ? 'bg-white text-[#4A90E2] shadow-md scale-[1.02]' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
              }`}
            >
              <div className={activeTab === item.tab ? 'text-[#4A90E2]' : 'text-slate-300'}>
                {item.icon}
              </div>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Search Bar Removed as per request */}
        <div className="hidden lg:block w-10"></div> 
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full p-8 lg:p-16 animate-fadeIn">
        {activeTab === AppTab.DASHBOARD ? (
          <div className="space-y-24">
            {/* Hero Section */}
            <section className="relative rounded-[64px] bg-[#4A90E2] p-16 lg:p-24 text-white shadow-3xl overflow-hidden group">
              <Sparkles className="absolute top-[-50px] right-[-50px] text-white/5 w-[500px] h-[500px] group-hover:rotate-12 transition-transform duration-[2000ms]" />
              <div className="relative z-10 max-w-3xl">
                <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-[12px] font-black uppercase tracking-[0.3em] inline-block mb-8 border border-white/20">Busan Local Guide</div>
                <h2 className="text-6xl lg:text-8xl font-black mb-8 leading-[1] tracking-tighter italic">지금 부산에서 <br/>가장 인기 있는 추천 스팟 🌊</h2>
                <p className="text-xl lg:text-2xl font-bold opacity-90 mb-0 leading-relaxed max-w-2xl">
                  부기가 친구들을 위해 엄선한 정말 멋진 장소들이에요! <br/>인생 사진 남기고 싶은 친구들은 내만 믿고 따라오면 된다구요! 기분 최고!
                </p>
              </div>
            </section>

            {/* Trending Now Feed - Main Highlight */}
            <section className="space-y-12 pb-12">
              <div className="flex items-end justify-between px-4">
                <div className="space-y-2">
                  <h3 className="text-4xl font-black text-slate-900 flex items-center gap-4 tracking-tighter uppercase italic">
                    <div className="w-3 h-3 bg-[#F5A623] rounded-full animate-ping"></div>
                    Trending Now
                  </h3>
                  <p className="text-slate-400 font-bold text-lg">친구들 사이에서 가장 화제가 되는 부산 명소 4곳</p>
                </div>
                <div className="hidden lg:block text-slate-300 font-black text-xs uppercase tracking-widest italic border-b border-slate-200 pb-1">
                    Updated every hour by Boogi
                </div>
              </div>
              <TrendGrid />
            </section>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto pb-24">
            <div className="mb-12 text-center">
              <div className="inline-block bg-[#4A90E2]/10 text-[#4A90E2] px-6 py-2 rounded-full text-[12px] font-black uppercase tracking-widest mb-4 border border-[#4A90E2]/20">Active Feature</div>
              <h3 className="text-6xl font-black text-slate-900 tracking-tighter uppercase italic mb-6">
                {getPageTitle(activeTab)}
              </h3>
              <div className="h-2 w-24 bg-[#F5A623] mx-auto rounded-full"></div>
            </div>
            <div className="bg-white rounded-[64px] p-10 lg:p-16 shadow-3xl border border-slate-100 min-h-[600px]">
              {activeTab === AppTab.CHAT && <BoogiBot />}
              {activeTab === AppTab.QUIZ && <Quiz />}
              {activeTab === AppTab.ART && <ArtistStudio />}
              {activeTab === AppTab.FOOD && <FoodWorldCup />}
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation - Floating Glass Style */}
      <nav className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] glass-card rounded-[40px] shadow-2xl p-3 flex justify-around items-center z-50 border border-white/50">
        {menuItems.map((item) => (
          <button 
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`flex flex-col items-center px-5 py-3 rounded-[24px] transition-all duration-300 ${
              activeTab === item.tab ? 'bg-[#4A90E2] text-white scale-110 shadow-lg' : 'text-slate-400'
            }`}
          >
            {item.icon}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-50 py-16 px-10 text-center text-slate-300 font-bold text-[12px] uppercase tracking-[0.3em]">
        &copy; 2024 BOOGI WAVE - Perfect Busan Guide for Friends
      </footer>
    </div>
  );
};

export default App;
