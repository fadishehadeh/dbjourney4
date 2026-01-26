import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, ArrowRight, Lock, Puzzle } from 'lucide-react';

interface GamePageProps {
  title: string;
  titleAr: string;
  onClose: () => void;
  onHome: () => void;
  language: 'EN' | 'AR';
}

const GamePage: React.FC<GamePageProps> = ({ title, titleAr, onClose, onHome, language }) => {
  const handleGameClick = (gameName: string) => {
    console.log(`Starting ${gameName}`);
    // TODO: Implement game logic
  };

  return (
    <motion.div
      key="game-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 bg-black overflow-hidden"
    >
      {/* Stars Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/stars.mp4" type="video/mp4" />
      </video>

      {/* Black Tint Overlay - 40% */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative h-full w-full flex flex-col items-center justify-center p-24 pt-32 pb-40 text-center">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-7xl font-bold mb-10"
        >
          {language === 'EN' ? title : titleAr}
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-1 bg-gradient-to-r from-[#3DAE2B] to-transparent mb-12"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-white/90 text-3xl mb-12"
        >
          {language === 'EN' ? 'Scan to register and win exciting prizes!' : 'امسح للتسجيل والفوز بجوائز مثيرة!'}
        </motion.p>

        {/* QR Code */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.9, type: "spring" }}
          className="bg-white p-12 rounded-3xl mb-16 shadow-2xl border-4 border-[#3DAE2B]"
        >
          <QrCode size={220} className="text-[#3DAE2B]" strokeWidth={1.5} />
          <p className="text-[#3DAE2B] text-2xl mt-6 font-bold">
            {language === 'EN' ? 'Game QR' : 'رمز QR للعبة'}
          </p>
          <p className="text-gray-600 text-sm mt-2">
            {language === 'EN' ? 'Scan to learn more' : 'امسح لمعرفة المزيد'}
          </p>
        </motion.div>

        {/* Game Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex gap-10 w-full max-w-5xl"
        >
          {/* Game 1: Arrow & Locker */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 60px rgba(61, 174, 43, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGameClick('Arrow & Locker')}
            className="flex-1 bg-gradient-to-br from-[#3DAE2B] to-[#2d8a22] text-white rounded-3xl p-12 shadow-2xl border-4 border-[#3DAE2B]/50 hover:border-[#3DAE2B] transition-all"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-6">
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight size={80} strokeWidth={2.5} />
                </motion.div>
                <motion.div
                  animate={{
                    rotate: [0, -10, 0, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Lock size={80} strokeWidth={2.5} />
                </motion.div>
              </div>
              <h3 className="text-5xl font-bold">
                {language === 'EN' ? 'Arrow & Locker' : 'السهم والقفل'}
              </h3>
              <p className="text-2xl opacity-90">
                {language === 'EN' ? 'Test your speed and precision!' : 'اختبر سرعتك ودقتك!'}
              </p>
            </div>
          </motion.button>

          {/* Game 2: Puzzle */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 60px rgba(61, 174, 43, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGameClick('Puzzle')}
            className="flex-1 bg-gradient-to-br from-[#3DAE2B] to-[#2d8a22] text-white rounded-3xl p-12 shadow-2xl border-4 border-[#3DAE2B]/50 hover:border-[#3DAE2B] transition-all"
          >
            <div className="flex flex-col items-center gap-6">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Puzzle size={80} strokeWidth={2.5} />
              </motion.div>
              <h3 className="text-5xl font-bold">
                {language === 'EN' ? 'Puzzle Challenge' : 'تحدي الألغاز'}
              </h3>
              <p className="text-2xl opacity-90">
                {language === 'EN' ? 'Solve the mystery!' : 'حل اللغز!'}
              </p>
            </div>
          </motion.button>
        </motion.div>
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
          onClick={onHome}
          className="flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white text-2xl font-semibold hover:bg-white/20 transition-colors"
        >
          {language === 'EN' ? 'Home' : 'الرئيسية'}
        </motion.button>

        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="flex items-center gap-3 px-10 py-5 bg-[#3DAE2B] backdrop-blur-xl rounded-full border border-[#3DAE2B] text-white text-2xl font-semibold hover:bg-[#35991f] transition-colors"
        >
          {language === 'EN' ? 'Back' : 'رجوع'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default GamePage;

