import React from 'react';
import { motion } from 'framer-motion';
import { X, Home, ExternalLink } from 'lucide-react';
import MotionOverlay from './MotionOverlay';

interface IframePageProps {
  url: string;
  title: string;
  titleAr: string;
  onClose: () => void;
  onHome: () => void;
  language: 'EN' | 'AR';
}

const IframePage: React.FC<IframePageProps> = ({ url, title, titleAr, onClose, onHome, language }) => {
  const handleOpenInNewTab = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      key="iframe-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 bg-black overflow-hidden z-50"
    >
      <MotionOverlay type="stars" />

      {/* Header with Close and Home buttons */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-6 bg-black/90 backdrop-blur-xl border-b border-white/10"
      >
        {/* Title */}
        <h1 className="text-white text-4xl font-bold">
          {language === 'EN' ? title : titleAr}
        </h1>

        {/* Buttons */}
        <div className="flex gap-4">
          {/* Home Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onHome}
            className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <Home size={24} />
          </motion.button>

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <X size={24} />
          </motion.button>
        </div>
      </motion.div>

      {/* Content Container - Show message and button instead of iframe */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="relative w-full h-full pt-24 pb-8 px-8 flex items-center justify-center"
      >
        <div className="text-center max-w-2xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-white text-5xl font-bold mb-6">
              {language === 'EN' ? title : titleAr}
            </h2>
            <p className="text-white/80 text-2xl mb-12">
              {language === 'EN'
                ? 'Click the button below to open the application in a new tab'
                : 'انقر على الزر أدناه لفتح التطبيق في علامة تبويب جديدة'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenInNewTab}
              className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-br from-[#002D74] to-[#001a45] text-white text-2xl font-bold rounded-full border-2 border-white/20 hover:border-white/40 transition-all shadow-2xl"
            >
              <ExternalLink size={32} />
              {language === 'EN' ? 'Open Application' : 'فتح التطبيق'}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IframePage;

