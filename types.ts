export interface LogEntry {
  id: string;
  date: string; // ISO date string
  taskName: string;
  duration: number; // in seconds
  coinsEarned: number;
  feeling: string;
  wisdom?: string; // AI generated quote
}

export interface UserState {
  coins: number;
  streak: number;
  lastActiveDate: string | null;
}

export enum AppView {
  FORGE = 'FORGE',
  CRUCIBLE = 'CRUCIBLE',
  JOURNAL = 'JOURNAL',
  SHOP = 'SHOP'
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  purchased: boolean;
}