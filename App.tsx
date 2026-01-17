
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Orbit, ChevronLeft, ChevronRight } from 'lucide-react';
import { ExperienceState } from './types';
import { TIMINGS, CHAPTERS, COLORS } from './constants';
import AssetPreloader from './components/AssetPreloader';
import MotionOverlay from './components/MotionOverlay';

const App: React.FC = () => {
  const [state, setState] = useState<ExperienceState>(ExperienceState.IDLE_LOOP);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoProgressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const adminResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const states = [
    ExperienceState.IDLE_LOOP,
    ExperienceState.START_SCREEN,
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

  // Handle auto progress for chapters and end state
  useEffect(() => {
    if (autoProgressRef.current) clearTimeout(autoProgressRef.current);
    
    if (state.startsWith('CHAPTER_')) {
      autoProgressRef.current = setTimeout(advance, TIMINGS.AUTO_PROGRESS);
    } else if (state === ExperienceState.END_STATE) {
      autoProgressRef.current = setTimeout(() => setState(ExperienceState.IDLE_LOOP), TIMINGS.END_RESET_TIMEOUT);
    }

    return () => {
      if (autoProgressRef.current) clearTimeout(autoProgressRef.current);
    };
  }, [state, advance]);

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
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="text-white text-lg tracking-[0.5em] uppercase font-light"
              >
                Dukhan Bank
              </motion.div>
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
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1080')` }}
              onPointerUp={advance}
            >
              <div className="absolute inset-0 bg-[#002D74]/80 backdrop-blur-sm" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="px-12 py-4 bg-[#3DAE2B] text-white text-2xl font-bold rounded-full shadow-2xl active:scale-95 transition-transform"
                >
                  Start Experience
                </motion.div>
              </div>
            </motion.div>
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

              {/* Content Overlay - High Contrast Typography */}
              <div className="relative h-full w-full flex flex-col justify-center pt-32 pb-64 px-12 text-left">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex gap-4 mb-8 text-[#3DAE2B]"
                >
                  {currentChapter.icons.map((icon, idx) => (
                    <div key={idx} className="p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl">
                      {React.cloneElement(icon as React.ReactElement, { size: 28 })}
                    </div>
                  ))}
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-white text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight drop-shadow-2xl"
                >
                  {currentChapter.headline}
                </motion.h1>

                {currentChapter.subline && (
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-white/95 text-lg md:text-xl max-w-sm font-light leading-relaxed drop-shadow-lg"
                  >
                    {currentChapter.subline}
                  </motion.p>
                )}
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
              onPointerUp={() => setState(ExperienceState.IDLE_LOOP)}
            >
              <MotionOverlay type="horizon" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-12"
              >
                <div className="text-[#3DAE2B] flex justify-center">
                  <Orbit size={80} strokeWidth={1} className="animate-pulse" />
                </div>
                <h2 className="text-white text-4xl font-bold">Future Forward</h2>
                <div className="h-px w-16 bg-[#3DAE2B] mx-auto opacity-50" />
                <p className="text-white/40 text-sm uppercase tracking-[0.4em] font-light">Dukhan Bank • Web Summit</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NAVIGATION UI (ONLY FOR CHAPTERS) */}
        {currentChapter && (
          <div className="absolute bottom-16 left-0 w-full flex flex-col items-center gap-8 z-50 pointer-events-none">
            {/* Nav Controls Bar */}
            <div className="flex items-center gap-10 pointer-events-auto bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl">
              {/* Back Arrow */}
              <motion.button 
                whileTap={{ scale: 0.8 }}
                onClick={(e) => { e.stopPropagation(); back(); }}
                disabled={currentChapterIndex === 0}
                className={`p-2 transition-colors ${currentChapterIndex === 0 ? 'text-white/10' : 'text-white/60 active:text-[#3DAE2B]'}`}
              >
                <ChevronLeft size={36} />
              </motion.button>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-3">
                {CHAPTERS.map((_, idx) => (
                  <motion.div
                    key={idx}
                    initial={false}
                    animate={{ 
                      scale: idx === currentChapterIndex ? 1.2 : 1,
                      backgroundColor: idx === currentChapterIndex ? COLORS.GREEN : 'rgba(255,255,255,0.3)'
                    }}
                    className="w-2.5 h-2.5 rounded-full"
                  />
                ))}
              </div>

              {/* Forward Arrow */}
              <motion.button 
                whileTap={{ scale: 0.8 }}
                onClick={(e) => { e.stopPropagation(); advance(); }}
                className="p-2 text-white/60 active:text-[#3DAE2B] transition-colors"
              >
                <ChevronRight size={36} />
              </motion.button>
            </div>
          </div>
        )}

        {/* Ambient Interaction Hint */}
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-6 left-0 w-full text-center text-white/20 text-[9px] font-mono tracking-[0.4em] uppercase"
        >
          {state === ExperienceState.IDLE_LOOP ? "Touch to Start" : "Swipe to Navigate"}
        </motion.div>
      </div>
    </AssetPreloader>
  );
};

export default App;
