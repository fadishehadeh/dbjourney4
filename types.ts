
// Fix: Import React to resolve namespace issues with ReactNode
import React from 'react';

export enum ExperienceState {
  // Main landing screens
  CORPORATE_LANDING = 'CORPORATE_LANDING',
  RETAIL_LANDING = 'RETAIL_LANDING',

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
  CORPORATE_SWIFT_SCORE = 'CORPORATE_SWIFT_SCORE',
  CORPORATE_VCP_NEW = 'CORPORATE_VCP_NEW',
  CORPORATE_PAYMENT_GATEWAY_NEW = 'CORPORATE_PAYMENT_GATEWAY_NEW',
  CORPORATE_DIGITAL_ONBOARDING = 'CORPORATE_DIGITAL_ONBOARDING',
  CORPORATE_WPS = 'CORPORATE_WPS',
  CORPORATE_PAYMENT_GATEWAY = 'CORPORATE_PAYMENT_GATEWAY',
  CORPORATE_RDC = 'CORPORATE_RDC',
  CORPORATE_DTAP = 'CORPORATE_DTAP',
  CORPORATE_CHEQUE_SERVICES = 'CORPORATE_CHEQUE_SERVICES',
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
  headlineAr: string;
  subline?: string;
  sublineAr?: string;
  icons: React.ReactNode[];
  overlayType: 'grid' | 'waves' | 'modular' | 'horizon' | 'stars';
}

export interface CardData {
  id: number;
  title: string;
  titleAr: string;
  icon: React.ReactNode;
  detailState: ExperienceState;
  hasVideo?: boolean;
  videoPath?: string;
  contentTitle?: string;
  contentTitleAr?: string;
  contentDescription?: string;
  contentDescriptionAr?: string;
}
