import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ForgeDashboard from './components/ForgeDashboard';
import CrucibleTimer from './components/CrucibleTimer';
import Journal from './components/Journal';
import Shop from './components/Shop';
import { AppView, UserState, LogEntry, ShopItem } from './types';

// Initial state mock
const INITIAL_STATE: UserState = {
  coins: 10,
  streak: 3,
  lastActiveDate: new Date().toISOString(),
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.FORGE);
  const [userState, setUserState] = useState<UserState>(INITIAL_STATE);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Load from local storage on mount (simulated)
  useEffect(() => {
    const savedLogs = localStorage.getItem('self_forge_logs');
    const savedUser = localStorage.getItem('self_forge_user');
    
    if (savedLogs) setLogs(JSON.parse(savedLogs));
    if (savedUser) setUserState(JSON.parse(savedUser));
  }, []);

  // Save on change
  useEffect(() => {
    localStorage.setItem('self_forge_logs', JSON.stringify(logs));
    localStorage.setItem('self_forge_user', JSON.stringify(userState));
  }, [logs, userState]);

  const handleNavigate = (view: AppView) => {
    setActiveView(view);
  };

  const handleTaskComplete = (taskName: string, feeling: string, wisdom: string) => {
    // 1. Create Log
    const newLog: LogEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      taskName,
      duration: 600,
      coinsEarned: 1, // 1 coin per 10 mins
      feeling,
      wisdom
    };

    // 2. Update Logs
    setLogs(prev => [...prev, newLog]);

    // 3. Update User State (Streak logic simplistic for now)
    setUserState(prev => ({
      ...prev,
      coins: prev.coins + 1,
      lastActiveDate: new Date().toISOString(),
      streak: prev.streak + 1 // Simply increment for demo purposes
    }));

    // 4. Navigate back to Journal to show result or stay on success screen then manual nav
    // For now, we stay in CrucibleTimer which shows Success screen, then user clicks button.
  };

  const handleReturnToForge = () => {
      setActiveView(AppView.FORGE);
  };

  const handlePurchase = (item: ShopItem) => {
    if (userState.coins >= item.cost) {
        setUserState(prev => ({
            ...prev,
            coins: prev.coins - item.cost
        }));
        alert(`획득 완료: ${item.name}`);
    }
  };

  return (
    <Layout activeView={activeView} onNavigate={handleNavigate}>
      {activeView === AppView.FORGE && (
        <ForgeDashboard userState={userState} onNavigate={handleNavigate} />
      )}
      {activeView === AppView.CRUCIBLE && (
        <CrucibleTimer onComplete={handleTaskComplete} onBack={handleReturnToForge} />
      )}
      {activeView === AppView.JOURNAL && (
        <Journal logs={logs} />
      )}
      {activeView === AppView.SHOP && (
        <Shop userState={userState} onPurchase={handlePurchase} />
      )}
    </Layout>
  );
};

export default App;