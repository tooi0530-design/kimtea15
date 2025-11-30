import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, RotateCcw, CheckCircle2, Sparkles, ArrowLeft } from 'lucide-react';
import { generateForgeWisdom } from '../services/geminiService';
import { AppView } from '../types';

interface CrucibleTimerProps {
  onComplete: (taskName: string, feeling: string, wisdom: string) => void;
  onBack: () => void;
}

const TIMER_DURATION = 600; // 10 minutes in seconds

const CrucibleTimer: React.FC<CrucibleTimerProps> = ({ onComplete, onBack }) => {
  const [taskName, setTaskName] = useState('');
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [feeling, setFeeling] = useState('');
  const [wisdom, setWisdom] = useState<string | null>(null);
  const [loadingWisdom, setLoadingWisdom] = useState(false);

  // Use 'any' to avoid NodeJS.Timeout type issues in browser environment
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handleCompleteTimer();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const handleCompleteTimer = async () => {
    setIsActive(false);
    setIsCompleted(true);
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Fetch wisdom
    setLoadingWisdom(true);
    const newWisdom = await generateForgeWisdom(taskName);
    setWisdom(newWisdom);
    setLoadingWisdom(false);
  };

  const handleStart = () => {
    if (!taskName.trim()) return;
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(TIMER_DURATION);
    setIsCompleted(false);
    setWisdom(null);
  };

  const handleFinalSubmit = () => {
    onComplete(taskName, feeling, wisdom || "침묵은 금입니다.");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((TIMER_DURATION - timeLeft) / TIMER_DURATION) * 100;

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full p-6 space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <Sparkles className="w-16 h-16 text-amber-400 mx-auto animate-pulse" />
          <h2 className="text-3xl font-display text-amber-500 uppercase tracking-widest">승리의 주조</h2>
          <p className="text-slate-300">행동으로 당신의 불안을 태워 없앴습니다.</p>
        </div>

        <div className="bg-slate-900 border border-amber-500/30 p-6 rounded-lg max-w-md w-full text-center">
            {loadingWisdom ? (
                <p className="text-amber-200/50 animate-pulse italic">오라클과 교신 중...</p>
            ) : (
                <div className="space-y-2">
                    <p className="font-display text-lg text-amber-100 leading-relaxed">"{wisdom}"</p>
                    <div className="w-12 h-0.5 bg-amber-500/50 mx-auto mt-4"></div>
                </div>
            )}
        </div>

        <div className="w-full max-w-md space-y-2">
          <label className="text-xs uppercase text-slate-500 tracking-wide">감정 기록 (선택 사항)</label>
          <textarea
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            placeholder="저항을 뚫고 나아갈 때 어떤 기분이 들었나요?"
            className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:border-amber-500 focus:outline-none transition-colors"
            rows={3}
          />
        </div>

        <button
          onClick={handleFinalSubmit}
          className="w-full max-w-md bg-amber-600 hover:bg-amber-500 text-white font-display py-4 rounded-sm uppercase tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all"
        >
          나의 코인 발행하기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-full p-6 relative">
      <button onClick={onBack} className="absolute top-6 left-6 text-slate-500 hover:text-slate-300">
        <ArrowLeft />
      </button>

      <div className="mt-12 text-center space-y-6 w-full max-w-md">
        <h2 className="text-2xl font-display text-slate-200 tracking-widest uppercase">담금질</h2>
        
        {!isActive && timeLeft === TIMER_DURATION ? (
          <div className="space-y-4">
             <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                <label className="block text-left text-xs text-amber-500 mb-2 uppercase tracking-wide">저항의 대상</label>
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="무엇을 회피하고 있나요?"
                    className="w-full bg-transparent border-b border-slate-600 text-xl py-2 text-white focus:outline-none focus:border-amber-500 placeholder-slate-600"
                />
             </div>
             <p className="text-slate-500 text-sm">완벽주의의 봉인을 해제하기 위한 10분.</p>
          </div>
        ) : (
             <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                 <p className="text-slate-400 text-sm uppercase">단련 중: <span className="text-amber-400">{taskName}</span></p>
             </div>
        )}

        {/* Timer Visual */}
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="128" cy="128" r="120" stroke="#1e293b" strokeWidth="8" fill="none" />
                <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="#d97706"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 120}
                    strokeDashoffset={((100 - progress) / 100) * (2 * Math.PI * 120)}
                    className="transition-all duration-1000 ease-linear"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(217,119,6, 0.5))' }}
                />
            </svg>
            
            <div className="text-5xl font-mono text-white font-bold tracking-tighter z-10">
                {formatTime(timeLeft)}
            </div>
            
            {/* Heat effect */}
             {isActive && (
                <div className="absolute inset-0 bg-orange-500/10 rounded-full animate-pulse blur-xl"></div>
             )}
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-6">
            {!isActive && timeLeft === TIMER_DURATION ? (
                <button
                    onClick={handleStart}
                    disabled={!taskName}
                    className={`flex items-center space-x-2 bg-slate-800 ${!taskName ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-700 hover:text-amber-400'} text-white px-8 py-3 rounded-full transition-all`}
                >
                    <Play size={20} fill="currentColor" />
                    <span className="uppercase tracking-wide font-bold">점화</span>
                </button>
            ) : (
                <>
                    {isActive ? (
                         <button onClick={handlePause} className="bg-slate-800 hover:bg-slate-700 text-white p-4 rounded-full transition-all">
                            <Square size={20} fill="currentColor" />
                         </button>
                    ) : (
                        <button onClick={handleStart} className="bg-slate-800 hover:bg-slate-700 text-green-400 p-4 rounded-full transition-all">
                            <Play size={20} fill="currentColor" />
                        </button>
                    )}
                    
                    <button onClick={handleReset} className="bg-slate-800 hover:bg-slate-700 text-red-400 p-4 rounded-full transition-all">
                        <RotateCcw size={20} />
                    </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default CrucibleTimer;