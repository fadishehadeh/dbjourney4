
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
        className="relative w-full h-full overflow-hidden select-none bg-[#002D74] touch-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <AnimatePresence mode="wait">
          {state === ExperienceState.IDLE_LOOP && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: TIMINGS.TRANSITION_DURATION / 1000 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-[#002D74]"
              onPointerUp={advance}
            >
              <MotionOverlay type="waves" />
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
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: TIMINGS.TRANSITION_DURATION / 1000 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1080')` }}
              onPointerUp={advance}
            >
              <motion.div
                className="absolute inset-0 bg-[#002D74]/80 backdrop-blur-sm"
                animate={{ opacity: [0.8, 0.85, 0.8] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-16 text-center">
                <motion.div
                  initial={{ y: 20, opacity: 0, scale: 0.9 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    boxShadow: [
                      "0 25px 50px -12px rgba(61, 174, 43, 0.25)",
                      "0 25px 50px -12px rgba(61, 174, 43, 0.5)",
                      "0 25px 50px -12px rgba(61, 174, 43, 0.25)"
                    ]
                  }}
                  transition={{
                    delay: 0.5,
                    boxShadow: { duration: 2, repeat: Infinity }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-28 py-12 bg-[#3DAE2B] text-white text-7xl font-bold rounded-full shadow-2xl cursor-pointer"
                >
                  Start Experience
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  className="absolute w-96 h-96 bg-[#3DAE2B] rounded-full blur-3xl"
                />
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
              className="absolute inset-0 bg-[#002D74] overflow-hidden"
            >
              <MotionOverlay type="grid" />

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
                onClick={() => setState(ExperienceState.CHAPTER_1)}
                className="absolute top-16 right-16 z-50 px-12 py-6 bg-[#3DAE2B] backdrop-blur-xl rounded-full border border-[#3DAE2B] text-white text-3xl font-bold hover:bg-[#35991f] transition-colors shadow-2xl"
              >
                Continue →
              </motion.button>

              <div className="relative h-full w-full flex flex-col items-center justify-center p-16 gap-16">
                <motion.h2
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-8xl font-bold text-center"
                >
                  Choose Your Journey
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
                      Retail
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
                      Corporate
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
                  Select your banking category
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
              className="absolute inset-0 bg-[#002D74] overflow-hidden"
            >
              <MotionOverlay type="grid" />

              {/* Home Button */}
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

              {/* Back Button */}
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
                onClick={() => setState(ExperienceState.SECTION_SELECTION)}
                className="absolute top-16 right-16 z-50 px-12 py-6 bg-[#3DAE2B] backdrop-blur-xl rounded-full border border-[#3DAE2B] text-white text-3xl font-bold hover:bg-[#35991f] transition-colors shadow-2xl"
              >
                ← Back
              </motion.button>

              <div className="relative h-full w-full flex flex-col items-center justify-center p-16 pt-32">
                <motion.h2
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-7xl font-bold mb-20 text-center"
                >
                  Retail Banking Services
                </motion.h2>

                <CardGrid cards={RETAIL_CARDS} onCardClick={(detailState) => setState(detailState)} />
              </div>
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
              className="absolute inset-0 bg-[#002D74] overflow-hidden"
            >
              <MotionOverlay type="modular" />

              {/* Home Button */}
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

              {/* Back Button */}
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
                onClick={() => setState(ExperienceState.SECTION_SELECTION)}
                className="absolute top-16 right-16 z-50 px-12 py-6 bg-[#3DAE2B] backdrop-blur-xl rounded-full border border-[#3DAE2B] text-white text-3xl font-bold hover:bg-[#35991f] transition-colors shadow-2xl"
              >
                ← Back
              </motion.button>

              <div className="relative h-full w-full flex flex-col items-center justify-center p-16 pt-32">
                <motion.h2
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-7xl font-bold mb-20 text-center"
                >
                  Corporate Banking Services
                </motion.h2>

                <CardGrid cards={CORPORATE_CARDS} onCardClick={(detailState) => setState(detailState)} />
              </div>
            </motion.div>
          )}

          {/* Retail Detail Pages */}
          {state === ExperienceState.RETAIL_MOBILE_APP && (
            <VideoDetailPage
              title="Mobile App"
              contentTitle={RETAIL_CARDS[0].contentTitle!}
              contentDescription={RETAIL_CARDS[0].contentDescription!}
              videoPath={RETAIL_CARDS[0].videoPath!}
              onClose={() => setState(ExperienceState.RETAIL_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
            />
          )}

          {state === ExperienceState.RETAIL_INSTANT_FINANCE && (
            <VideoDetailPage
              title="Instant Finance"
              contentTitle={RETAIL_CARDS[1].contentTitle!}
              contentDescription={RETAIL_CARDS[1].contentDescription!}
              videoPath={RETAIL_CARDS[1].videoPath!}
              onClose={() => setState(ExperienceState.RETAIL_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
            />
          )}

          {state === ExperienceState.RETAIL_INSTANT_PREPAID && (
            <VideoDetailPage
              title="Instant Prepaid Card"
              contentTitle={RETAIL_CARDS[2].contentTitle!}
              contentDescription={RETAIL_CARDS[2].contentDescription!}
              videoPath={RETAIL_CARDS[2].videoPath!}
              onClose={() => setState(ExperienceState.RETAIL_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
            />
          )}

          {state === ExperienceState.RETAIL_CARD_OFFERS && (
            <VideoDetailPage
              title="Card Linked Offers"
              contentTitle={RETAIL_CARDS[3].contentTitle!}
              contentDescription={RETAIL_CARDS[3].contentDescription!}
              videoPath={RETAIL_CARDS[3].videoPath!}
              onClose={() => setState(ExperienceState.RETAIL_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
            />
          )}

          {state === ExperienceState.RETAIL_DAWARDS && (
            <VideoDetailPage
              title="DAwards"
              contentTitle={RETAIL_CARDS[4].contentTitle!}
              contentDescription={RETAIL_CARDS[4].contentDescription!}
              videoPath={RETAIL_CARDS[4].videoPath!}
              onClose={() => setState(ExperienceState.RETAIL_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
            />
          )}

          {state === ExperienceState.RETAIL_GAME && (
            <GamePage
              title="Retail Gaming Zone"
              onClose={() => setState(ExperienceState.RETAIL_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
            />
          )}

          {/* Corporate Detail Pages */}
          {state === ExperienceState.CORPORATE_VCP && (
            <VideoDetailPage
              title="VCP"
              contentTitle={CORPORATE_CARDS[0].contentTitle!}
              contentDescription={CORPORATE_CARDS[0].contentDescription!}
              videoPath={CORPORATE_CARDS[0].videoPath!}
              onClose={() => setState(ExperienceState.CORPORATE_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
            />
          )}

          {state === ExperienceState.CORPORATE_WPS && (
            <VideoDetailPage
              title="WPS"
              contentTitle={CORPORATE_CARDS[1].contentTitle!}
              contentDescription={CORPORATE_CARDS[1].contentDescription!}
              videoPath={CORPORATE_CARDS[1].videoPath!}
              onClose={() => setState(ExperienceState.CORPORATE_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
            />
          )}

          {state === ExperienceState.CORPORATE_PAYMENT_GATEWAY && (
            <VideoDetailPage
              title="Payment Gateway"
              contentTitle={CORPORATE_CARDS[2].contentTitle!}
              contentDescription={CORPORATE_CARDS[2].contentDescription!}
              videoPath={CORPORATE_CARDS[2].videoPath!}
              onClose={() => setState(ExperienceState.CORPORATE_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
            />
          )}

          {state === ExperienceState.CORPORATE_RDC && (
            <VideoDetailPage
              title="RDC"
              contentTitle={CORPORATE_CARDS[3].contentTitle!}
              contentDescription={CORPORATE_CARDS[3].contentDescription!}
              videoPath={CORPORATE_CARDS[3].videoPath!}
              onClose={() => setState(ExperienceState.CORPORATE_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
            />
          )}

          {state === ExperienceState.CORPORATE_GAME && (
            <GamePage
              title="Corporate Challenge"
              onClose={() => setState(ExperienceState.CORPORATE_CARDS)}
              onHome={() => setState(ExperienceState.START_SCREEN)}
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
              {/* Strengthened Gradient Overlays for Maximum Contrast */}
              <div className="absolute inset-0 bg-[#002D74]/60" /> {/* Uniform Dark Tint */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#002D74]/95 via-[#002D74]/50 to-[#002D74]/95" />
              
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
                  {currentChapter.headline.split(' ').map((word, idx) => (
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
                    {currentChapter.subline}
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
              className="absolute inset-0 flex flex-col items-center justify-center bg-[#002D74] text-center px-12"
            >
              <MotionOverlay type="horizon" />

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
                Restart ↻
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
                  {"Future Forward".split('').map((char, idx) => (
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
                  Dukhan Bank • Web Summit
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
            {state === ExperienceState.IDLE_LOOP ? "Touch to Start" : "Swipe to Navigate"}
          </motion.span>
        </motion.div>
      </div>
    </AssetPreloader>
  );
};

export default App;
