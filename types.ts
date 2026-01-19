
// Fix: Import React to resolve namespace issues with ReactNode
import React from 'react';

export enum ExperienceState {
  IDLE_LOOP = 'IDLE_LOOP',
  START_SCREEN = 'START_SCREEN',
  CARD_SELECTION = 'CARD_SELECTION',
  CARD_DETAIL_1 = 'CARD_DETAIL_1',
  CARD_DETAIL_2 = 'CARD_DETAIL_2',
  CARD_DETAIL_3 = 'CARD_DETAIL_3',
  CARD_DETAIL_4 = 'CARD_DETAIL_4',
  CARD_DETAIL_5 = 'CARD_DETAIL_5',
  CARD_DETAIL_6 = 'CARD_DETAIL_6',
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
}
