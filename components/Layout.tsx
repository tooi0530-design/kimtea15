import React from 'react';
import { AppView } from '../types';
import { Flame, Scroll, ShoppingBag, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  onNavigate: (view: AppView) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate }) => {
  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-amber-900 selection:text-amber-100">
      <main className="flex-1 overflow-y-auto relative">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="h-20 bg-slate-950 border-t border-slate-800 flex items-center justify-around z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        <button 
          onClick={() => onNavigate(AppView.FORGE)}
          className={`flex flex-col items-center space-y-1 w-16 transition-colors ${activeView === AppView.FORGE ? 'text-amber-500' : 'text-slate-600 hover:text-slate-400'}`}
        >
          <Flame size={24} className={activeView === AppView.FORGE ? 'fill-current animate-pulse' : ''} />
          <span className="text-[10px] uppercase tracking-widest font-bold">용광로</span>
        </button>

        <button 
           onClick={() => onNavigate(AppView.JOURNAL)}
           className={`flex flex-col items-center space-y-1 w-16 transition-colors ${activeView === AppView.JOURNAL ? 'text-amber-500' : 'text-slate-600 hover:text-slate-400'}`}
        >
          <Scroll size={24} />
          <span className="text-[10px] uppercase tracking-widest font-bold">기록</span>
        </button>
        
        <button 
           onClick={() => onNavigate(AppView.SHOP)}
           className={`flex flex-col items-center space-y-1 w-16 transition-colors ${activeView === AppView.SHOP ? 'text-amber-500' : 'text-slate-600 hover:text-slate-400'}`}
        >
          <ShoppingBag size={24} />
          <span className="text-[10px] uppercase tracking-widest font-bold">무기고</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;