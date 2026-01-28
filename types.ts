
export enum AppTab {
  DASHBOARD = 'DASHBOARD',
  CHAT = 'CHAT',
  QUIZ = 'QUIZ',
  ART = 'ART',
  FOOD = 'FOOD'
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface ChatMessage {
  role: 'user' | 'boogi';
  text: string;
  timestamp: number;
  sources?: GroundingSource[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface FoodItem {
  id: string;
  name: string;
  image: string;
  category: string;
  tagline: string;
  tips: string;
}

export interface TrendSpot {
  id: string;
  title: string;
  thumbnail: string;
  comment: string;
  url: string;
  platform: 'youtube' | 'instagram';
}
