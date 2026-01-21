import React from 'react';
import { motion } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { ExperienceState } from '../types';

interface VideoDetailPageProps {
  title: string;
  contentTitle: string;
  contentDescription: string;
  videoPath: string;
  onClose: () => void;
  onHome: () => void;
}

const VideoDetailPage: React.FC<VideoDetailPageProps> = ({
  title,
  contentTitle,
  contentDescription,
  videoPath,
  onClose,
  onHome
}) => {
  const [showVideo, setShowVideo] = React.useState(false);

  return (
    <motion.div
      key="video-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 bg-[#002D74] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#002D74] via-[#001a45] to-[#000000]" />
      
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

      {!showVideo ? (
        <div className="relative h-full w-full flex flex-col items-center justify-center p-24 text-center">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white text-8xl font-bold mb-12"
          >
            {contentTitle}
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
            className="text-white/90 text-4xl max-w-5xl leading-relaxed mb-16"
          >
            {contentDescription}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowVideo(true)}
            className="flex items-center gap-6 px-20 py-8 bg-[#3DAE2B] text-white text-5xl font-bold rounded-full shadow-2xl hover:bg-[#35991f] transition-colors"
          >
            <Play size={48} fill="white" />
            Watch Video
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="relative w-full h-full flex items-center justify-center p-16 pt-32"
        >
          <video
            controls
            autoPlay
            className="w-full h-full max-w-7xl max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            src={videoPath}
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VideoDetailPage;

