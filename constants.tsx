
import React from 'react';
import { ExperienceState, ChapterData } from './types';
import { 
  Zap, TrendingUp, ShieldCheck, 
  Smartphone, CreditCard, Headphones, CreditCard as CardIcon,
  User, Building2, Briefcase, Gem, 
  Sparkles, Leaf, Orbit
} from 'lucide-react';

export const COLORS = {
  WHITE: '#FFFFFF',
  DARK_BLUE: '#002D74',
  GREEN: '#3DAE2B',
};

export const TIMINGS = {
  TRANSITION_DURATION: 800, // ms
  IDLE_TIMEOUT: 60000, // 60s
  AUTO_PROGRESS: 12000, // 12s
  END_RESET_TIMEOUT: 8000, // 8s
};

export const CHAPTERS: ChapterData[] = [
  {
    id: ExperienceState.CHAPTER_1,
    backgroundImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1080',
    headline: 'Architecting Qatar’s Digital Future',
    subline: 'Merging visionary leadership with breakthrough innovation to redefine the modern financial landscape.',
    icons: [<Zap key="1" />, <TrendingUp key="2" />, <ShieldCheck key="3" />],
    overlayType: 'waves',
  },
  {
    id: ExperienceState.CHAPTER_2,
    backgroundImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1080',
    headline: 'Intuitive Banking at Your Fingertips',
    subline: 'Harnessing advanced mobile technologies to deliver seamless, real-time financial empowerment globally.',
    icons: [<Smartphone key="1" />, <CreditCard key="2" />, <Headphones key="3" />, <CardIcon key="4" />],
    overlayType: 'grid',
  },
  {
    id: ExperienceState.CHAPTER_3,
    backgroundImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1080',
    headline: 'Precision Solutions for Global Wealth',
    subline: 'Custom-engineered financial instruments designed to scale businesses and secure future generations.',
    icons: [<User key="1" />, <Building2 key="2" />, <Briefcase key="3" />, <Gem key="4" />],
    overlayType: 'modular',
  },
  {
    id: ExperienceState.CHAPTER_4,
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1080',
    headline: 'Pioneering Tomorrow’s Sustainable Economy',
    subline: 'Committing to ethical growth and green innovation for a connected, resilient future.',
    icons: [<Sparkles key="1" />, <Leaf key="2" />, <Orbit key="3" />],
    overlayType: 'horizon',
  }
];
