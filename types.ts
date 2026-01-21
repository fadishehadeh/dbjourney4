
// Fix: Import React to resolve namespace issues with ReactNode
import React from 'react';

export enum ExperienceState {
  IDLE_LOOP = 'IDLE_LOOP',
  START_SCREEN = 'START_SCREEN',
  SECTION_SELECTION = 'SECTION_SELECTION',

  // Retail Section
  RETAIL_CARDS = 'RETAIL_CARDS',
  RETAIL_MOBILE_APP = 'RETAIL_MOBILE_APP',
  RETAIL_INSTANT_FINANCE = 'RETAIL_INSTANT_FINANCE',
  RETAIL_INSTANT_PREPAID = 'RETAIL_INSTANT_PREPAID',
  RETAIL_CARD_OFFERS = 'RETAIL_CARD_OFFERS',
  RETAIL_DAWARDS = 'RETAIL_DAWARDS',
  RETAIL_GAME = 'RETAIL_GAME',

  // Corporate Section
  CORPORATE_CARDS = 'CORPORATE_CARDS',
  CORPORATE_VCP = 'CORPORATE_VCP',
  CORPORATE_WPS = 'CORPORATE_WPS',
  CORPORATE_PAYMENT_GATEWAY = 'CORPORATE_PAYMENT_GATEWAY',
  CORPORATE_RDC = 'CORPORATE_RDC',
  CORPORATE_GAME = 'CORPORATE_GAME',

  CHAPTER_1 = 'CHAPTER_1',
  CHAPTER_2 = 'CHAPTER_2',
  CHAPTER_3 = 'CHAPTER_3',
  CHAPTER_4 = 'CHAPTER_4',
  END_STATE = 'END_STATE'
}

export interface ChapterData {
  id: ExperienceState;
  backgroundImage: string;
  headline: string;
  subline?: string;
  icons: React.ReactNode[];
  overlayType: 'grid' | 'waves' | 'modular' | 'horizon';
}

export interface CardData {
  id: number;
  title: string;
  icon: React.ReactNode;
  detailState: ExperienceState;
  hasVideo?: boolean;
  videoPath?: string;
  contentTitle?: string;
  contentDescription?: string;
}
