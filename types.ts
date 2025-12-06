import { PAGES } from './constants';

// FIX: The circular reference error was caused by `constants.tsx` depending on this file.
// That dependency has been removed. Parentheses are added here for clarity.
export type Page = (typeof PAGES)[number];

export interface Poster {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface ResearchTopic {
  title: string;
  summary: string;
  content: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
}