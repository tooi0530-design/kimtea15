import React from 'react';
import { UserState } from '../types';
import { Flame, Coins, Hammer } from 'lucide-react';

interface ForgeDashboardProps {
  userState: UserState;
  onNavigate: (view: any) => void;
}

const ForgeDashboard: React.FC<ForgeDashboardProps> = ({ userState, onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-start min-h-full p-6 space-y-8 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-orange-900/20 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="z-10 text-center space-y-2 animate-fade-in">
        <h1 className="text-3xl md:text-4xl text-amber-500 font-display tracking-widest drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]">
          THE SELF-FORGE
        </h1>
        <p className="text-slate-400 text-sm md:text-base italic">
          "불안을 황금으로 승화하라."
        </p>
      </div>

      {/* The Core Forge Visual */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center z-10 group cursor-pointer" onClick={() => onNavigate('CRUCIBLE')}>
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-slate-800 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-slate-950/80 backdrop-blur-sm"></div>
        
        {/* Inner Glowing Core */}
        <div className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-500 blur-md animate-pulse-heat opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Molten Liquid Effect */}
        <div className="absolute w-40 h-40 rounded-full bg-black overflow-hidden border-2 border-amber-700/50">
           <div className="w-full h-full bg-[url('https://picsum.photos/200/200?grayscale&blur=2')] opacity-30 mix-blend-overlay"></div>
           <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-amber-500/80 to-transparent animate-pulse"></div>
        </div>

        {/* Center Icon */}
        <div className="absolute z-20 flex flex-col items-center">
            <Flame className="w-12 h-12 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-bounce" />
            <span className="mt-2 font-display text-amber-200 tracking-wider text-xs uppercase">주조 중</span>
        </div>
      </div>

      {/* Stats Display */}
      <div className="z-10 grid grid-cols-2 gap-4 w-full max-w-md">
        <div className="bg-slate-900/80 border border-slate-700 p-4 rounded-lg flex flex-col items-center justify-center shadow-lg">
          <div className="flex items-center space-x-2 text-amber-400 mb-1">
            <Coins size={20} />
            <span className="font-display font-bold text-xl">{userState.coins}</span>
          </div>
          <span className="text-slate-500 text-xs uppercase tracking-wide">자기 확신 코인</span>
        </div>
        
        <div className="bg-slate-900/80 border border-slate-700 p-4 rounded-lg flex flex-col items-center justify-center shadow-lg">
           <div className="flex items-center space-x-2 text-orange-400 mb-1">
            <Hammer size={20} />
            <span className="font-display font-bold text-xl">{userState.streak}</span>
          </div>
          <span className="text-slate-500 text-xs uppercase tracking-wide">연속 달성일</span>
        </div>
      </div>

      {/* Call to Action */}
      <button 
        onClick={() => onNavigate('CRUCIBLE')}
        className="z-10 bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-white font-display py-4 px-8 rounded-sm border border-amber-500/50 shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all transform hover:scale-105 uppercase tracking-widest"
      >
        용광로 입장
      </button>

      {/* Daily Tasks Preview */}
      <div className="z-10 w-full max-w-md bg-slate-900/50 border border-slate-800 rounded-lg p-4">
        <h3 className="text-slate-400 text-xs uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">오늘의 잠재력</h3>
        <ul className="space-y-3">
            <li className="flex items-center text-sm text-slate-300">
                <div className="w-2 h-2 rounded-full bg-slate-600 mr-3"></div>
                작은 꾸준함이 완벽한 멈춤을 이깁니다.
            </li>
            <li className="flex items-center text-sm text-slate-300">
                <div className="w-2 h-2 rounded-full bg-slate-600 mr-3"></div>
                불꽃을 피우는 데는 10분이면 충분합니다.
            </li>
        </ul>
      </div>
    </div>
  );
};

export default ForgeDashboard;