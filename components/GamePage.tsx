import React from 'react';
import { motion } from 'framer-motion';
import { X, QrCode, ArrowRight, Lock, Puzzle } from 'lucide-react';

interface GamePageProps {
  title: string;
  onClose: () => void;
  onHome: () => void;
}

const GamePage: React.FC<GamePageProps> = ({ title, onClose, onHome }) => {
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
      className="absolute inset-0 bg-gradient-to-br from-[#002D74] via-[#001a45] to-[#000000] overflow-hidden"
    >
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
        onClick={onHome}
        className="absolute top-16 left-16 z-50 px-12 py-6 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white text-3xl font-bold hover:bg-white/20 transition-colors shadow-2xl"
      >
        ← Home
      </motion.button>

      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="absolute top-16 right-16 z-50 p-6 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors"
      >
        <X size={48} />
      </motion.button>

      <div className="relative h-full w-full flex flex-col items-center justify-center p-24 text-center">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-8xl font-bold mb-12"
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-1 bg-gradient-to-r from-[#3DAE2B] to-transparent mb-16"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-white/90 text-4xl mb-16"
        >
          Scan to register and win exciting prizes!
        </motion.p>

        {/* QR Code */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.9, type: "spring" }}
          className="bg-white p-16 rounded-3xl mb-20 shadow-2xl"
        >
          <QrCode size={280} className="text-[#002D74]" strokeWidth={1.5} />
          <p className="text-[#002D74] text-3xl mt-8 font-bold">Scan to Register</p>
        </motion.div>

        {/* Game Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex gap-12 w-full max-w-6xl"
        >
          {/* Game 1: Arrow & Locker */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 60px rgba(61, 174, 43, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGameClick('Arrow & Locker')}
            className="flex-1 bg-gradient-to-br from-[#3DAE2B] to-[#2d8a22] text-white rounded-3xl p-16 shadow-2xl border-4 border-[#3DAE2B]/50 hover:border-[#3DAE2B] transition-all"
          >
            <div className="flex flex-col items-center gap-8">
              <div className="flex gap-8">
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
                  <ArrowRight size={100} strokeWidth={2.5} />
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
                  <Lock size={100} strokeWidth={2.5} />
                </motion.div>
              </div>
              <h3 className="text-6xl font-bold">Arrow & Locker</h3>
              <p className="text-3xl opacity-90">Test your speed and precision!</p>
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
            className="flex-1 bg-gradient-to-br from-[#3DAE2B] to-[#2d8a22] text-white rounded-3xl p-16 shadow-2xl border-4 border-[#3DAE2B]/50 hover:border-[#3DAE2B] transition-all"
          >
            <div className="flex flex-col items-center gap-8">
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
                <Puzzle size={100} strokeWidth={2.5} />
              </motion.div>
              <h3 className="text-6xl font-bold">Puzzle Challenge</h3>
              <p className="text-3xl opacity-90">Solve the mystery!</p>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GamePage;

