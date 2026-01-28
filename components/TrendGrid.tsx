
import React, { useEffect, useState } from 'react';
import { TrendSpot } from '../types';
import { getTrendingSpots } from '../services/geminiService';
import { Youtube, Instagram, ExternalLink, Play, Sparkles } from 'lucide-react';

const TrendGrid: React.FC = () => {
  const [spots, setSpots] = useState<TrendSpot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingSpots().then(data => {
      setSpots(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-[40px] h-72 animate-pulse border border-slate-100 shadow-sm"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fadeIn">
      {spots.map((spot) => (
        <a 
          key={spot.id} 
          href={spot.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative bg-white rounded-[40px] overflow-hidden shadow-lg border-[3px] border-transparent hover:border-[#F5A623] hover:-translate-y-2 transition-all duration-500 flex flex-col"
        >
          {/* Thumbnail */}
          <div className="relative h-52 overflow-hidden">
            <img 
              src={spot.thumbnail} 
              alt={spot.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all flex items-center justify-center">
              <div className="bg-white/30 backdrop-blur-md p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
                <Play className="text-white fill-white" size={24} />
              </div>
            </div>
            <div className="absolute top-5 left-5">
              {spot.platform === 'youtube' ? (
                <div className="bg-red-500 text-white p-2 rounded-xl shadow-lg flex items-center gap-1.5">
                  <Youtube size={16} />
                  <span className="text-[10px] font-black uppercase tracking-tighter">YouTube</span>
                </div>
              ) : (
                <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white p-2 rounded-xl shadow-lg flex items-center gap-1.5">
                  <Instagram size={16} />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Instagram</span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-extrabold text-slate-800 line-clamp-1 mb-2 tracking-tight group-hover:text-[#4A90E2] transition-colors">
                {spot.title}
              </h4>
              <p className="text-sm text-slate-500 font-semibold leading-relaxed line-clamp-2">
                <Sparkles size={14} className="inline mr-1 text-[#F5A623]" />
                {spot.comment}
              </p>
            </div>
            <div className="mt-5 flex items-center justify-between text-[11px] font-black text-[#4A90E2] uppercase tracking-widest border-t border-slate-50 pt-4">
              <span className="group-hover:translate-x-1 transition-transform">자세히 보기</span>
              <ExternalLink size={14} />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default TrendGrid;
