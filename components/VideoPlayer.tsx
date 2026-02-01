import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import MotionOverlay from './MotionOverlay';

interface VideoPlayerProps {
  videoPath: string;
  onClose: () => void;
  language: 'EN' | 'AR';
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoPath, onClose, language }) => {
  return (
    <motion.div
      key="video-player"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 bg-black overflow-hidden z-50"
    >
      <MotionOverlay type="stars" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="relative w-full h-full flex items-center justify-center p-16 pt-32 pb-40"
      >
        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-24 right-24 z-50 w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
        >
          <X size={32} />
        </motion.button>

        {/* Video */}
        <video
          controls
          autoPlay
          className="w-full h-full max-w-7xl max-h-[70vh] object-contain rounded-2xl shadow-2xl"
          src={videoPath}
        >
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </motion.div>
  );
};

export default VideoPlayer;

