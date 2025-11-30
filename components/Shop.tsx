import React from 'react';
import { UserState, ShopItem } from '../types';
import { Lock, Unlock } from 'lucide-react';

interface ShopProps {
  userState: UserState;
  onPurchase: (item: ShopItem) => void;
}

const ITEMS: ShopItem[] = [
  { id: '1', name: '휴식 허가증', description: '죄책감 없는 1시간 휴식.', cost: 5, icon: '☕', purchased: false },
  { id: '2', name: '용기의 훈장', description: '100개 과제 달성 디지털 배지.', cost: 50, icon: '🛡️', purchased: false },
  { id: '3', name: '오라클의 비밀', description: '특별한 명상 테마 잠금 해제.', cost: 20, icon: '🔮', purchased: false },
  { id: '4', name: '황금 망치', description: '용광로 비주얼 업그레이드.', cost: 100, icon: '🔨', purchased: false },
];

const Shop: React.FC<ShopProps> = ({ userState, onPurchase }) => {
  return (
    <div className="flex flex-col min-h-full p-6 space-y-6 pb-20">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-display text-slate-200 uppercase tracking-widest">무기고</h2>
        <p className="text-slate-500 text-sm">심리적 자본을 투자하세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ITEMS.map((item) => (
          <div key={item.id} className="bg-slate-900/50 border border-slate-700 p-5 rounded-lg flex justify-between items-center group hover:bg-slate-900 transition-colors">
            <div className="flex items-center space-x-4">
               <div className="text-3xl bg-slate-800 w-12 h-12 flex items-center justify-center rounded-full shadow-inner">
                 {item.icon}
               </div>
               <div>
                 <h4 className="text-amber-100 font-display font-bold">{item.name}</h4>
                 <p className="text-xs text-slate-400">{item.description}</p>
               </div>
            </div>
            
            <button 
                onClick={() => onPurchase(item)}
                disabled={userState.coins < item.cost}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all border ${
                    userState.coins >= item.cost 
                    ? 'bg-amber-900/30 border-amber-600 text-amber-500 hover:bg-amber-800/50' 
                    : 'bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed'
                }`}
            >
                {userState.coins >= item.cost ? (
                    <div className="flex flex-col items-center">
                        <span>획득</span>
                        <span className="text-[10px]">{item.cost} 코인</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <Lock size={12} className="mb-1"/>
                        <span>{item.cost} 코인</span>
                    </div>
                )}
            </button>
          </div>
        ))}
      </div>
      
      <div className="bg-slate-800/50 p-6 rounded text-center border border-dashed border-slate-700 mt-8">
        <p className="text-slate-400 text-sm">레벨이 오르면 더 많은 아티팩트가 주조될 것입니다.</p>
      </div>
    </div>
  );
};

export default Shop;