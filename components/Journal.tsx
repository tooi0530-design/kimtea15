import React from 'react';
import { LogEntry } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Scroll, Award, Quote } from 'lucide-react';

interface JournalProps {
  logs: LogEntry[];
}

const Journal: React.FC<JournalProps> = ({ logs }) => {
  // Aggregate data for chart (Last 7 days)
  const getLast7DaysData = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = logs.filter(l => l.date.startsWith(dateStr)).reduce((acc, curr) => acc + curr.coinsEarned, 0);
      days.push({ name: d.toLocaleDateString('ko-KR', { weekday: 'short' }), coins: count });
    }
    return days;
  };

  const data = getLast7DaysData();

  // Confidence Index calculation
  const totalCoins = logs.reduce((acc, curr) => acc + curr.coinsEarned, 0);
  const confidenceLevel = Math.min(100, totalCoins * 2); 

  return (
    <div className="flex flex-col min-h-full p-6 space-y-6 pb-20">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-display text-slate-200 uppercase tracking-widest">탐험 기록</h2>
        <p className="text-slate-500 text-sm">당신의 존재에 대한 증명.</p>
      </div>

      {/* Confidence Index */}
      <div className="bg-slate-900/50 border border-slate-700 p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-amber-500 uppercase text-xs tracking-wider font-bold">자기 확신 지수</h3>
            <span className="text-slate-300 font-mono">{confidenceLevel}%</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
                className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 transition-all duration-1000"
                style={{ width: `${confidenceLevel}%` }}
            ></div>
        </div>
        <p className="text-xs text-slate-500 mt-2 italic">축적된 당신의 심리적 자본을 기반으로 합니다.</p>
      </div>

      {/* Chart */}
      <div className="bg-slate-900/50 border border-slate-700 p-4 rounded-lg h-64 shadow-lg">
        <h3 className="text-slate-400 uppercase text-xs tracking-wider mb-4">꾸준함의 단련도</h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fbbf24' }}
                itemStyle={{ color: '#fbbf24' }}
            />
            <Bar dataKey="coins" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.coins > 0 ? '#d97706' : '#1e293b'} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* History List */}
      <div className="space-y-4">
        <h3 className="text-slate-400 uppercase text-xs tracking-wider border-b border-slate-800 pb-2">최근 주조 기록</h3>
        {logs.length === 0 ? (
            <div className="text-center py-10 text-slate-600 italic">
                기록이 비어있습니다. 첫 번째 주조를 시작하세요.
            </div>
        ) : (
            logs.slice().reverse().map((log) => (
            <div key={log.id} className="bg-slate-900/30 border border-slate-800 p-4 rounded-lg flex flex-col space-y-2 hover:border-slate-600 transition-colors">
                <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                        <div className="bg-amber-900/20 p-2 rounded-full">
                            <Award size={16} className="text-amber-500" />
                        </div>
                        <div>
                            <p className="text-slate-200 font-medium">{log.taskName}</p>
                            <p className="text-xs text-slate-500">{new Date(log.date).toLocaleDateString()} • {new Date(log.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        </div>
                    </div>
                    <span className="text-amber-400 font-bold">+{log.coinsEarned}</span>
                </div>
                
                {log.wisdom && (
                    <div className="mt-2 pl-4 border-l-2 border-slate-700">
                        <p className="text-xs text-slate-400 italic font-serif">"{log.wisdom}"</p>
                    </div>
                )}
            </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Journal;