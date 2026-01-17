
// Fix: Import React to resolve namespace issues with ReactNode
import React from 'react';

export enum ExperienceState {
  IDLE_LOOP = 'IDLE_LOOP',
  START_SCREEN = 'START_SCREEN',
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
