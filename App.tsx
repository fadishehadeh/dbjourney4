
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Orbit, ChevronLeft, ChevronRight, Building2, Users as UsersIcon } from 'lucide-react';
import { ExperienceState } from './types';
import { TIMINGS, CHAPTERS, COLORS, RETAIL_CARDS, CORPORATE_CARDS } from './constants';
import AssetPreloader from './components/AssetPreloader';
import MotionOverlay from './components/MotionOverlay';
import CardGrid from './components/CardGrid';
import VideoDetailPage from './components/VideoDetailPage';
import GamePage from './components/GamePage';

const App: React.FC = () => {
  const [state, setState] = useState<ExperienceState>(ExperienceState.IDLE_LOOP);
  const [language, setLanguage] = useState<'EN' | 'AR'>('EN');
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoProgressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const adminResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const states = [
    ExperienceState.IDLE_LOOP,
    ExperienceState.START_SCREEN,
    ExperienceState.SECTION_SELECTION,
    ExperienceState.CHAPTER_1,
    ExperienceState.CHAPTER_2,
    ExperienceState.CHAPTER_3,
    ExperienceState.CHAPTER_4,
    ExperienceState.END_STATE
  ];

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (state !== ExperienceState.IDLE_LOOP) {
      idleTimerRef.current = setTimeout(() => {
        setState(ExperienceState.IDLE_LOOP);
      }, TIMINGS.IDLE_TIMEOUT);
    }
  }, [state]);

  const advance = useCallback(() => {
    const currentIndex = states.indexOf(state);
    if (currentIndex < states.length - 1) {
      setState(states[currentIndex + 1]);
    } else {
      setState(states[0]);
    }
  }, [state, states]);

  const back = useCallback(() => {
    const currentIndex = states.indexOf(state);
    // Don't go back past Start Screen if in chapters
    if (currentIndex > 1) {
      setState(states[currentIndex - 1]);
    }
  }, [state, states]);

  // Handle auto progress for end state only (chapters are now manual)
  useEffect(() => {
    if (autoProgressRef.current) clearTimeout(autoProgressRef.current);

    // Only auto-progress from END_STATE back to IDLE_LOOP
    if (state === ExperienceState.END_STATE) {
      autoProgressRef.current = setTimeout(() => setState(ExperienceState.IDLE_LOOP), TIMINGS.END_RESET_TIMEOUT);
    }

    return () => {
      if (autoProgressRef.current) clearTimeout(autoProgressRef.current);
    };
  }, [state]);

  // Global listeners for idle timer
  useEffect(() => {
    const handleActivity = () => resetIdleTimer();
    window.addEventListener('pointerdown', handleActivity);
    resetIdleTimer();
    return () => window.removeEventListener('pointerdown', handleActivity);
  }, [resetIdleTimer]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      advance();
    } else if (info.offset.x > threshold) {
      back();
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    // Admin reset logic (3s hold in corner)
    if (e.clientX < 100 && e.clientY < 100) {
      adminResetRef.current = setTimeout(() => {
        setState(ExperienceState.IDLE_LOOP);
      }, 3000);
    }
  };

  const handlePointerUp = () => {
    if (adminResetRef.current) clearTimeout(adminResetRef.current);
  };

  const currentChapterIndex = CHAPTERS.findIndex(ch => ch.id === state);
  const currentChapter = CHAPTERS[currentChapterIndex];

  return (
    <AssetPreloader>
      <div
        className="relative w-full h-full overflow-hidden select-none bg-black touch-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {/* Global Header - Appears on all pages except IDLE_LOOP */}
        {state !== ExperienceState.IDLE_LOOP && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-6 bg-black/90 backdrop-blur-xl border-b border-white/10"
          >
            {/* Logo */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setState(ExperienceState.START_SCREEN)}
              className="flex items-center cursor-pointer"
            >
              <img
                src="/images/dublogo-lg.svg"
                alt="Dukhan Bank"
                className="h-20 w-auto"
              />
            </motion.button>

            {/* Right Side: Language Switcher and Retail/Corporate Selector */}
            <div className="flex items-center gap-10">
              {/* Language Switcher */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-3 py-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLanguage('EN')}
                  className={`px-8 py-3 rounded-full text-xl font-semibold transition-all ${
                    language === 'EN'
                      ? 'bg-white text-black'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  EN
                </motion.button>
                <div className="w-px h-8 bg-white/20" />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLanguage('AR')}
                  className={`px-8 py-3 rounded-full text-xl font-semibold transition-all ${
                    language === 'AR'
                      ? 'bg-white text-black'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  AR
                </motion.button>
              </div>

              {/* Retail/Corporate Selector Slider - Shows on all pages */}
              <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-full p-2">
                {/* Animated slider background */}
                <motion.div
                  animate={{
                    x: state === ExperienceState.RETAIL_CARDS || state === ExperienceState.RETAIL_MOBILE_APP || state === ExperienceState.RETAIL_INSTANT_FINANCE || state === ExperienceState.RETAIL_INSTANT_PREPAID || state === ExperienceState.RETAIL_CARD_OFFERS || state === ExperienceState.RETAIL_DAWARDS || state === ExperienceState.RETAIL_GAME ? 0 : '100%',
                    backgroundColor: state === ExperienceState.RETAIL_CARDS || state === ExperienceState.RETAIL_MOBILE_APP || state === ExperienceState.RETAIL_INSTANT_FINANCE || state === ExperienceState.RETAIL_INSTANT_PREPAID || state === ExperienceState.RETAIL_CARD_OFFERS || state === ExperienceState.RETAIL_DAWARDS || state === ExperienceState.RETAIL_GAME ? '#3DAE2B' : '#002D74'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-y-2 w-[calc(50%-4px)] rounded-full"
                />

                {/* Retail Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setState(ExperienceState.RETAIL_CARDS)}
                  className="relative z-10 px-10 py-3 text-white text-xl font-semibold transition-colors rounded-full"
                >
                  {language === 'EN' ? 'Retail' : 'التجزئة'}
                </motion.button>

                {/* Corporate Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setState(ExperienceState.CORPORATE_CARDS)}
                  className="relative z-10 px-10 py-3 text-white text-xl font-semibold transition-colors rounded-full"
                >
                  {language === 'EN' ? 'Corporate' : 'الشركات'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {state === ExperienceState.IDLE_LOOP && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: TIMINGS.TRANSITION_DURATION / 1000 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black"
              onPointerUp={advance}
            >
              <MotionOverlay type="stars" />
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8],
                  y: [0, -10, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="w-[500px]"
              >
                <img src="/images/dublogo-lg.svg" alt="Dukhan Bank" className="w-full h-auto" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3DAE2B]/5 to-transparent"
              />
            </motion.div>
          )}

          {state === ExperienceState.START_SCREEN && (
            <motion.div
              key="start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: TIMINGS.TRANSITION_DURATION / 1000 }}
              className="absolute inset-0 bg-black"
            >
              {/* Stars Background */}
              <MotionOverlay type="stars" />

              {/* Main Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-16 pt-32">
                {/* Title */}
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-white text-9xl font-bold mb-10 leading-tight"
                >
                  {language === 'EN' ? (
                    <>
                      Wholesale & SME<br />Banking
                    </>
                  ) : (
                    <>
                      الخدمات المصرفية للجملة<br />والمؤسسات الصغيرة والمتوسطة
                    </>
                  )}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="text-white/70 text-4xl mb-20 font-light"
                >
                  {language === 'EN'
                    ? 'Experience the future of corporate banking'
                    : 'اختبر مستقبل الخدمات المصرفية للشركات'}
                </motion.p>

                {/* Animated Line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '120px' }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="h-1 bg-gradient-to-r from-transparent via-[#3DAE2B] to-transparent mb-16"
                />

                {/* Start Experience Button */}
                <motion.button
                  initial={{ y: 20, opacity: 0, scale: 0.9 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: 1
                  }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 60px rgba(61, 174, 43, 0.6)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={advance}
                  className="relative px-40 py-10 bg-gradient-to-r from-[#2d8a1f] via-[#3DAE2B] to-[#2d8a1f] text-white text-5xl font-bold rounded-full shadow-2xl overflow-hidden group"
                >
                  {/* Animated gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                  <span className="relative z-10">
                    {language === 'EN' ? 'Start Experience' : 'ابدأ التجربة'}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {state === ExperienceState.SECTION_SELECTION && (
            <motion.div
              key="section-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: TIMINGS.TRANSITION_DURATION / 1000 }}
              className="absolute inset-0 bg-black overflow-hidden"
            >
              <MotionOverlay type="stars" />

              <div className="relative h-full w-full flex flex-col items-center justify-center p-16 pt-32 gap-16">
                <motion.h2
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-8xl font-bold text-center"
                >
                  {language === 'EN' ? 'Choose Your Journey' : 'اختر رحلتك'}
                </motion.h2>

                <div className="flex gap-16 items-center justify-center">
                  {/* Retail Button */}
                  <motion.div
                    initial={{ opacity: 0, x: -100, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setState(ExperienceState.RETAIL_CARDS)}
                    className="bg-gradient-to-br from-[#3DAE2B] to-[#2d8a1f] backdrop-blur-xl rounded-3xl p-20 border-4 border-white/30 cursor-pointer shadow-2xl hover:shadow-[0_0_60px_rgba(61,174,43,0.6)] transition-all"
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, 0, -5, 0], y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="text-white mb-10 flex justify-center"
                    >
                      <UsersIcon size={120} strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="text-white text-7xl font-bold text-center">
                      {language === 'EN' ? 'Retail' : 'التجزئة'}
                    </h3>
                  </motion.div>

                  {/* Corporate Button */}
                  <motion.div
                    initial={{ opacity: 0, x: 100, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setState(ExperienceState.CORPORATE_CARDS)}
                    className="bg-gradient-to-br from-[#002D74] to-[#001a45] backdrop-blur-xl rounded-3xl p-20 border-4 border-white/30 cursor-pointer shadow-2xl hover:shadow-[0_0_60px_rgba(0,45,116,0.6)] transition-all"
                  >
                    <motion.div
                      animate={{ rotate: [0, -5, 0, 5, 0], y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="text-white mb-10 flex justify-center"
                    >
                      <Building2 size={120} strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="text-white text-7xl font-bold text-center">
                      {language === 'EN' ? 'Corporate' : 'الشركات'}
                    </h3>
                  </motion.div>
                </div>

                {/* Bottom hint text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 1.2 }}
                  className="text-white/40 text-3xl text-center"
                >
                  {language === 'EN' ? 'Select your banking category' : 'اختر فئة الخدمات المصرفية'}
                </motion.p>
              </div>
            </motion.div>
          )}

          {/* Retail Cards Screen */}
          {state === ExperienceState.RETAIL_CARDS && (
            <motion.div
              key="retail-cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: TIMINGS.TRANSITION_DURATION / 1000 }}
              className="absolute inset-0 bg-black overflow-hidden"
            >
              <MotionOverlay type="stars" />

              <div className="relative h-full w-full flex flex-col items-center justify-center px-[12%] py-[8%] pt-32 pb-40">
                <CardGrid cards={RETAIL_CARDS} onCardClick={(detailState) => setState(detailState)} language={language} />
              </div>

              {/* Sticky Footer */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-8 bg-black/90 backdrop-blur-xl border-t border-white/10"
              >
                {/* Home Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setState(ExperienceState.START_SCREEN)}
                  className="flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white text-2xl font-semibold hover:bg-white/20 transition-colors"
                >
                  {language === 'EN' ? 'Home' : 'الرئيسية'}
                </motion.button>

                {/* Back Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setState(ExperienceState.SECTION_SELECTION)}
                  className="flex items-center gap-3 px-10 py-5 bg-[#3DAE2B] backdrop-blur-xl rounded-full border border-[#3DAE2B] text-white text-2xl font-semibold hover:bg-[#35991f] transition-colors"
                >
                  {language === 'EN' ? 'Back' : 'رجوع'}
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Corporate Cards Screen */}
          {state === ExperienceState.CORPORATE_CARDS && (
            <motion.div
              key="corporate-cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: TIMINGS.TRANSITION_DURATION / 1000 }}
              className="absolute inset-0 bg-black overflow-hidden"
            >
              <MotionOverlay type="stars" />

              <div className="relative h-full w-full flex flex-col items-center justify-center px-[12%] py-[8%] pt-32 pb-40">
                <CardGrid cards={CORPORATE_CARDS} onCardClick={(detailState) => setState(detailState)} language={language} />
              </div>

              {/* Sticky Footer */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-8 bg-black/90 backdrop-blur-xl border-t border-white/10"
              >
                {/* Home Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setState(ExperienceState.START_SCREEN)}
                  className="flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white text-2xl font-semibold hover:bg-white/20 transition-colors"
                >
                  {language === 'EN' ? 'Home' : 'الرئيسية'}
                </motion.button>

                {/* Back Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setState(ExperienceState.SECTION_SELECTION)}
                  className="flex items-center gap-3 px-10 py-5 bg-[#3DAE2B] backdrop-blur-xl rounded-full border border-[#3DAE2B] text-white text-2xl font-semibold hover:bg-[#35991f] transition-colors"
                >
                  {language === 'EN' ? 'Back' : 'رجوع'}
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Retail Detail Pages */}
          {state === ExperienceState.RETAIL_MOBILE_APP && (
            <VideoDetailPage
              title={RETAIL_CARDS[0].title}
              titleAr={RETAIL_CARDS[0].titleAr}
              contentTitle={RETAIL_CARDS[0].contentTitle!}
              contentTitleAr={RETAIL_CARDS[0].contentTitleAr!}
              contentDescription={RETAIL_CARDS[0].contentDescription!}
              contentDescriptionAr={RETAIL_CARDS[0].contentDescriptionAr!}
              videoPath={RETAIL_CARDS[0].videoPath!}
              onClose={() => setState(ExperienceState.RETAIL_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
              language={language}
            />
          )}

          {state === ExperienceState.RETAIL_INSTANT_FINANCE && (
            <VideoDetailPage
              title={RETAIL_CARDS[1].title}
              titleAr={RETAIL_CARDS[1].titleAr}
              contentTitle={RETAIL_CARDS[1].contentTitle!}
              contentTitleAr={RETAIL_CARDS[1].contentTitleAr!}
              contentDescription={RETAIL_CARDS[1].contentDescription!}
              contentDescriptionAr={RETAIL_CARDS[1].contentDescriptionAr!}
              videoPath={RETAIL_CARDS[1].videoPath!}
              onClose={() => setState(ExperienceState.RETAIL_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
              language={language}
            />
          )}

          {state === ExperienceState.RETAIL_INSTANT_PREPAID && (
            <VideoDetailPage
              title={RETAIL_CARDS[2].title}
              titleAr={RETAIL_CARDS[2].titleAr}
              contentTitle={RETAIL_CARDS[2].contentTitle!}
              contentTitleAr={RETAIL_CARDS[2].contentTitleAr!}
              contentDescription={RETAIL_CARDS[2].contentDescription!}
              contentDescriptionAr={RETAIL_CARDS[2].contentDescriptionAr!}
              videoPath={RETAIL_CARDS[2].videoPath!}
              onClose={() => setState(ExperienceState.RETAIL_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
              language={language}
            />
          )}

          {state === ExperienceState.RETAIL_CARD_OFFERS && (
            <VideoDetailPage
              title={RETAIL_CARDS[3].title}
              titleAr={RETAIL_CARDS[3].titleAr}
              contentTitle={RETAIL_CARDS[3].contentTitle!}
              contentTitleAr={RETAIL_CARDS[3].contentTitleAr!}
              contentDescription={RETAIL_CARDS[3].contentDescription!}
              contentDescriptionAr={RETAIL_CARDS[3].contentDescriptionAr!}
              videoPath={RETAIL_CARDS[3].videoPath!}
              onClose={() => setState(ExperienceState.RETAIL_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
              language={language}
            />
          )}

          {state === ExperienceState.RETAIL_DAWARDS && (
            <VideoDetailPage
              title={RETAIL_CARDS[4].title}
              titleAr={RETAIL_CARDS[4].titleAr}
              contentTitle={RETAIL_CARDS[4].contentTitle!}
              contentTitleAr={RETAIL_CARDS[4].contentTitleAr!}
              contentDescription={RETAIL_CARDS[4].contentDescription!}
              contentDescriptionAr={RETAIL_CARDS[4].contentDescriptionAr!}
              videoPath={RETAIL_CARDS[4].videoPath!}
              onClose={() => setState(ExperienceState.RETAIL_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
              language={language}
            />
          )}

          {state === ExperienceState.RETAIL_GAME && (
            <GamePage
              title="Retail Gaming Zone"
              titleAr="منطقة الألعاب للأفراد"
              onClose={() => setState(ExperienceState.RETAIL_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
              language={language}
            />
          )}

          {/* Corporate Detail Pages */}
          {state === ExperienceState.CORPORATE_VCP && (
            <VideoDetailPage
              title={CORPORATE_CARDS[0].title}
              titleAr={CORPORATE_CARDS[0].titleAr}
              contentTitle={CORPORATE_CARDS[0].contentTitle!}
              contentTitleAr={CORPORATE_CARDS[0].contentTitleAr!}
              contentDescription={CORPORATE_CARDS[0].contentDescription!}
              contentDescriptionAr={CORPORATE_CARDS[0].contentDescriptionAr!}
              videoPath={CORPORATE_CARDS[0].videoPath!}
              onClose={() => setState(ExperienceState.CORPORATE_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
              language={language}
            />
          )}

          {state === ExperienceState.CORPORATE_WPS && (
            <VideoDetailPage
              title={CORPORATE_CARDS[1].title}
              titleAr={CORPORATE_CARDS[1].titleAr}
              contentTitle={CORPORATE_CARDS[1].contentTitle!}
              contentTitleAr={CORPORATE_CARDS[1].contentTitleAr!}
              contentDescription={CORPORATE_CARDS[1].contentDescription!}
              contentDescriptionAr={CORPORATE_CARDS[1].contentDescriptionAr!}
              videoPath={CORPORATE_CARDS[1].videoPath!}
              onClose={() => setState(ExperienceState.CORPORATE_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
              language={language}
            />
          )}

          {state === ExperienceState.CORPORATE_PAYMENT_GATEWAY && (
            <VideoDetailPage
              title={CORPORATE_CARDS[2].title}
              titleAr={CORPORATE_CARDS[2].titleAr}
              contentTitle={CORPORATE_CARDS[2].contentTitle!}
              contentTitleAr={CORPORATE_CARDS[2].contentTitleAr!}
              contentDescription={CORPORATE_CARDS[2].contentDescription!}
              contentDescriptionAr={CORPORATE_CARDS[2].contentDescriptionAr!}
              videoPath={CORPORATE_CARDS[2].videoPath!}
              onClose={() => setState(ExperienceState.CORPORATE_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
              language={language}
            />
          )}

          {state === ExperienceState.CORPORATE_RDC && (
            <VideoDetailPage
              title={CORPORATE_CARDS[3].title}
              titleAr={CORPORATE_CARDS[3].titleAr}
              contentTitle={CORPORATE_CARDS[3].contentTitle!}
              contentTitleAr={CORPORATE_CARDS[3].contentTitleAr!}
              contentDescription={CORPORATE_CARDS[3].contentDescription!}
              contentDescriptionAr={CORPORATE_CARDS[3].contentDescriptionAr!}
              videoPath={CORPORATE_CARDS[3].videoPath!}
              onClose={() => setState(ExperienceState.CORPORATE_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
              language={language}
            />
          )}

          {state === ExperienceState.CORPORATE_GAME && (
            <GamePage
              title="Corporate Challenge"
              titleAr="تحدي الشركات"
              onClose={() => setState(ExperienceState.CORPORATE_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
              language={language}
            />
          )}

          {currentChapter && (
            <motion.div
              key={state}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              transition={{ duration: TIMINGS.TRANSITION_DURATION / 1000, ease: "anticipate" }}
              className="absolute inset-0 overflow-hidden"
            >
              {/* Background with drift */}
              <motion.div
                animate={{ scale: 1.15, x: [-30, 30] }}
                transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${currentChapter.backgroundImage}')` }}
              />
              {/* Dark Gradient Overlays for Maximum Contrast */}
              <div className="absolute inset-0 bg-black/70" /> {/* Uniform Dark Tint */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/60 to-black/95" />

              <MotionOverlay type={currentChapter.overlayType} />

              {/* Home Button - Top Left */}
              <motion.button
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  boxShadow: [
                    "0 0 20px rgba(255, 255, 255, 0.1)",
                    "0 0 30px rgba(255, 255, 255, 0.2)",
                    "0 0 20px rgba(255, 255, 255, 0.1)"
                  ]
                }}
                transition={{
                  delay: 0.8,
                  type: "spring",
                  stiffness: 100,
                  boxShadow: { duration: 3, repeat: Infinity }
                }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setState(ExperienceState.START_SCREEN)}
                className="absolute top-16 left-16 z-50 px-12 py-6 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white text-3xl font-bold hover:bg-white/20 transition-colors shadow-2xl"
              >
                ← Home
              </motion.button>

              {/* Continue Button - Top Right */}
              <motion.button
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  boxShadow: [
                    "0 0 20px rgba(61, 174, 43, 0.3)",
                    "0 0 40px rgba(61, 174, 43, 0.5)",
                    "0 0 20px rgba(61, 174, 43, 0.3)"
                  ]
                }}
                transition={{
                  delay: 0.8,
                  type: "spring",
                  stiffness: 100,
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
                whileHover={{
                  scale: 1.1,
                  x: 5,
                  boxShadow: "0 0 50px rgba(61, 174, 43, 0.6)"
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => advance()}
                className="absolute top-16 right-16 z-50 px-12 py-6 bg-[#3DAE2B] backdrop-blur-xl rounded-full border border-[#3DAE2B] text-white text-3xl font-bold hover:bg-[#35991f] transition-colors shadow-2xl"
              >
                Continue →
              </motion.button>

              {/* Content Overlay - High Contrast Typography */}
              <div className="relative h-full w-full flex flex-col justify-center pt-48 pb-80 px-24 text-left">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex gap-8 mb-16 text-[#3DAE2B]"
                >
                  {currentChapter.icons.map((icon, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="p-7 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl"
                    >
                      <motion.div
                        animate={{
                          y: [0, -5, 0],
                          rotate: [0, 5, 0, -5, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: idx * 0.3
                        }}
                      >
                        {React.cloneElement(icon as React.ReactElement, { size: 72 })}
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 100 }}
                  className="text-white text-8xl font-bold leading-tight mb-14 tracking-tight drop-shadow-2xl"
                >
                  {(language === 'EN' ? currentChapter.headline : currentChapter.headlineAr).split(' ').map((word, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                      className="inline-block mr-6"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>

                {currentChapter.subline && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="text-white/95 text-4xl max-w-4xl font-light leading-relaxed drop-shadow-lg"
                  >
                    {language === 'EN' ? currentChapter.subline : currentChapter.sublineAr}
                  </motion.p>
                )}

                {/* Animated accent line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "200px" }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="h-1 bg-gradient-to-r from-[#3DAE2B] to-transparent mt-10"
                />
              </div>
            </motion.div>
          )}

          {state === ExperienceState.END_STATE && (
            <motion.div
              key="end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: TIMINGS.TRANSITION_DURATION / 1000 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black text-center px-12"
            >
              <MotionOverlay type="stars" />

              {/* Home Button - Top Left */}
              <motion.button
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  boxShadow: [
                    "0 0 20px rgba(255, 255, 255, 0.1)",
                    "0 0 30px rgba(255, 255, 255, 0.2)",
                    "0 0 20px rgba(255, 255, 255, 0.1)"
                  ]
                }}
                transition={{
                  delay: 0.8,
                  type: "spring",
                  stiffness: 100,
                  boxShadow: { duration: 3, repeat: Infinity }
                }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setState(ExperienceState.START_SCREEN)}
                className="absolute top-16 left-16 z-50 px-12 py-6 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white text-3xl font-bold hover:bg-white/20 transition-colors shadow-2xl"
              >
                {language === 'EN' ? '← Home' : 'الرئيسية ←'}
              </motion.button>

              {/* Restart Button - Top Right */}
              <motion.button
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  boxShadow: [
                    "0 0 20px rgba(61, 174, 43, 0.3)",
                    "0 0 40px rgba(61, 174, 43, 0.5)",
                    "0 0 20px rgba(61, 174, 43, 0.3)"
                  ]
                }}
                transition={{
                  delay: 0.8,
                  type: "spring",
                  stiffness: 100,
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
                whileHover={{
                  scale: 1.1,
                  x: 5,
                  boxShadow: "0 0 50px rgba(61, 174, 43, 0.6)"
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setState(ExperienceState.IDLE_LOOP)}
                className="absolute top-16 right-16 z-50 px-12 py-6 bg-[#3DAE2B] backdrop-blur-xl rounded-full border border-[#3DAE2B] text-white text-3xl font-bold hover:bg-[#35991f] transition-colors shadow-2xl"
              >
                {language === 'EN' ? 'Restart ↻' : 'إعادة التشغيل ↻'}
              </motion.button>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-20 relative"
              >
                {/* Animated glow effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 bg-[#3DAE2B] blur-3xl"
                />

                <motion.div
                  initial={{ y: 30, opacity: 0, scale: 0.8 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotateY: [0, 5, 0, -5, 0]
                  }}
                  transition={{
                    delay: 0.3,
                    rotateY: { duration: 6, repeat: Infinity }
                  }}
                  className="w-[500px] mx-auto relative z-10"
                >
                  <img src="/images/dublogo-lg.svg" alt="Dukhan Bank" className="w-full h-auto" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-white text-8xl font-bold relative z-10"
                >
                  {(language === 'EN' ? "Future Forward" : "نحو المستقبل").split('').map((char, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + idx * 0.05 }}
                      className="inline-block"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.h2>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "160px" }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="h-px bg-[#3DAE2B] mx-auto opacity-50 relative z-10"
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 2 }}
                  className="text-white/40 text-3xl uppercase tracking-[0.4em] font-light relative z-10"
                >
                  {language === 'EN' ? 'Dukhan Bank • Web Summit' : 'بنك دخان • ويب سوميت'}
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NAVIGATION UI (ONLY FOR CHAPTERS) */}
        {currentChapter && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, type: "spring", stiffness: 100 }}
            className="absolute bottom-32 left-0 w-full flex flex-col items-center gap-8 z-50 pointer-events-none"
          >
            {/* Nav Controls Bar */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(61, 174, 43, 0.1)",
                  "0 0 40px rgba(61, 174, 43, 0.2)",
                  "0 0 20px rgba(61, 174, 43, 0.1)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex items-center gap-20 pointer-events-auto bg-black/30 backdrop-blur-md px-14 py-7 rounded-full border border-white/10 shadow-2xl"
            >
              {/* Back Arrow */}
              <motion.button
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1, x: -5 }}
                onClick={(e) => { e.stopPropagation(); back(); }}
                disabled={currentChapterIndex === 0}
                className={`p-4 transition-colors ${currentChapterIndex === 0 ? 'text-white/10' : 'text-white/60 active:text-[#3DAE2B]'}`}
              >
                <motion.div
                  animate={currentChapterIndex !== 0 ? { x: [-2, 2, -2] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChevronLeft size={72} />
                </motion.div>
              </motion.button>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-6">
                {CHAPTERS.map((_, idx) => (
                  <motion.div
                    key={idx}
                    initial={false}
                    animate={{
                      scale: idx === currentChapterIndex ? 1.2 : 1,
                      backgroundColor: idx === currentChapterIndex ? COLORS.GREEN : 'rgba(255,255,255,0.3)',
                      y: idx === currentChapterIndex ? [0, -5, 0] : 0
                    }}
                    transition={{
                      y: { duration: 1.5, repeat: Infinity }
                    }}
                    whileHover={{ scale: 1.3 }}
                    className="w-5 h-5 rounded-full cursor-pointer"
                  />
                ))}
              </div>

              {/* Forward Arrow */}
              <motion.button
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1, x: 5 }}
                onClick={(e) => { e.stopPropagation(); advance(); }}
                className="p-4 text-white/60 active:text-[#3DAE2B] transition-colors"
              >
                <motion.div
                  animate={{ x: [2, -2, 2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChevronRight size={72} />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* Ambient Interaction Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.2, 0.1, 0.2, 0],
            y: [0, -8, 0, -8, 0],
            scale: [1, 1.02, 1, 1.02, 1]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-14 left-0 w-full text-center text-white/20 text-2xl font-mono tracking-[0.4em] uppercase"
        >
          <motion.span
            animate={{
              textShadow: [
                "0 0 10px rgba(61, 174, 43, 0)",
                "0 0 20px rgba(61, 174, 43, 0.3)",
                "0 0 10px rgba(61, 174, 43, 0)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {state === ExperienceState.IDLE_LOOP
              ? (language === 'EN' ? "Touch to Start" : "المس للبدء")
              : (language === 'EN' ? "Swipe to Navigate" : "اسحب للتنقل")}
          </motion.span>
        </motion.div>
      </div>
    </AssetPreloader>
  );
};

export default App;
