
import React from 'react';
import { ExperienceState, ChapterData, CardData } from './types';
import {
  Zap, TrendingUp, ShieldCheck,
  Smartphone, CreditCard, Headphones, CreditCard as CardIcon,
  User, Building2, Briefcase, Gem,
  Sparkles, Leaf, Orbit,
  Wallet, Globe, Lock, TrendingUp as Chart, Users, Award,
  DollarSign, Gift, Gamepad2, FileText, Banknote, QrCode
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

// Retail Cards
export const RETAIL_CARDS: CardData[] = [
  {
    id: 1,
    title: 'Mobile App',
    icon: <Smartphone key="mobile" />,
    detailState: ExperienceState.RETAIL_MOBILE_APP,
    hasVideo: true,
    videoPath: '/videos/retail-mobile-app.mp4',
    contentTitle: 'Banking at Your Fingertips',
    contentDescription: 'Experience seamless banking with our award-winning mobile app. Manage accounts, transfer funds, pay bills, and access exclusive features - all from the palm of your hand. Available 24/7 with biometric security and real-time notifications.'
  },
  {
    id: 2,
    title: 'Instant Finance',
    icon: <DollarSign key="finance" />,
    detailState: ExperienceState.RETAIL_INSTANT_FINANCE,
    hasVideo: true,
    videoPath: '/videos/retail-instant-finance.mp4',
    contentTitle: 'Quick Loans, Instant Approval',
    contentDescription: 'Get the funds you need in minutes with our instant finance solutions. Apply online, receive instant approval, and have money in your account within hours. Competitive rates, flexible terms, and no hidden fees.'
  },
  {
    id: 3,
    title: 'Instant Prepaid Card',
    icon: <CreditCard key="prepaid" />,
    detailState: ExperienceState.RETAIL_INSTANT_PREPAID,
    hasVideo: true,
    videoPath: '/videos/retail-prepaid-card.mp4',
    contentTitle: 'Spend Smart, Stay Secure',
    contentDescription: 'Control your spending with our instant prepaid cards. Load funds instantly, use worldwide, and enjoy complete security. Perfect for budgeting, online shopping, and travel. Get your virtual card immediately.'
  },
  {
    id: 4,
    title: 'Card Linked Offers',
    icon: <Gift key="offers" />,
    detailState: ExperienceState.RETAIL_CARD_OFFERS,
    hasVideo: true,
    videoPath: '/videos/retail-card-offers.mp4',
    contentTitle: 'Exclusive Rewards & Cashback',
    contentDescription: 'Unlock amazing deals and cashback offers linked directly to your card. Shop at partner merchants and automatically earn rewards. No coupons needed - just swipe and save on dining, shopping, travel, and entertainment.'
  },
  {
    id: 5,
    title: 'DAwards',
    icon: <Award key="dawards" />,
    detailState: ExperienceState.RETAIL_DAWARDS,
    hasVideo: true,
    videoPath: '/videos/retail-dawards.mp4',
    contentTitle: 'Your Loyalty, Our Rewards',
    contentDescription: 'Earn DAwards points on every transaction and redeem them for exclusive benefits. From travel upgrades to shopping vouchers, your loyalty deserves recognition. The more you bank, the more you earn.'
  },
  {
    id: 6,
    title: 'Game',
    icon: <Gamepad2 key="game-retail" />,
    detailState: ExperienceState.RETAIL_GAME,
    hasVideo: false,
    contentTitle: 'Play & Win Prizes',
    contentDescription: 'Test your skills and win exciting prizes! Register now to unlock exclusive games and compete for amazing rewards.'
  }
];

// Corporate Cards
export const CORPORATE_CARDS: CardData[] = [
  {
    id: 1,
    title: 'VCP',
    icon: <Wallet key="vcp" />,
    detailState: ExperienceState.CORPORATE_VCP,
    hasVideo: true,
    videoPath: '/videos/vcp.mp4',
    contentTitle: 'Virtual Commercial Platform',
    contentDescription: 'Streamline your business payments with our cutting-edge Virtual Commercial Platform. Manage virtual cards, control spending, and gain real-time insights into corporate expenses. Enhanced security and complete flexibility for modern businesses.'
  },
  {
    id: 2,
    title: 'WPS',
    icon: <Users key="wps" />,
    detailState: ExperienceState.CORPORATE_WPS,
    hasVideo: true,
    videoPath: '/videos/corporate-wps.mp4',
    contentTitle: 'Wage Protection System',
    contentDescription: 'Ensure timely and compliant salary payments with our WPS solution. Automated payroll processing, government compliance, and detailed reporting. Protect your employees and your business with our secure wage management system.'
  },
  {
    id: 3,
    title: 'Payment Gateway',
    icon: <Globe key="gateway" />,
    detailState: ExperienceState.CORPORATE_PAYMENT_GATEWAY,
    hasVideo: true,
    videoPath: '/videos/corporate-payment-gateway.mp4',
    contentTitle: 'Seamless Online Payments',
    contentDescription: 'Accept payments from customers worldwide with our robust payment gateway. Support for multiple currencies, advanced fraud protection, and instant settlement. Integrate easily with your e-commerce platform and grow your business globally.'
  },
  {
    id: 4,
    title: 'RDC',
    icon: <FileText key="rdc" />,
    detailState: ExperienceState.CORPORATE_RDC,
    hasVideo: true,
    videoPath: '/videos/corporate-rdc.mp4',
    contentTitle: 'Remote Deposit Capture',
    contentDescription: 'Deposit checks from anywhere with our Remote Deposit Capture solution. Simply scan and submit - no branch visit required. Faster processing, improved cash flow, and reduced operational costs for your business.'
  },
  {
    id: 5,
    title: 'Game',
    icon: <Gamepad2 key="game-corporate" />,
    detailState: ExperienceState.CORPORATE_GAME,
    hasVideo: false,
    contentTitle: 'Corporate Challenge',
    contentDescription: 'Engage your team with our interactive corporate games. Register your details and compete for exclusive business rewards and recognition.'
  }
];

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
