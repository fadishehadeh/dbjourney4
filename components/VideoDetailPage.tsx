import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, X } from 'lucide-react';
import { ExperienceState } from '../types';
import MotionOverlay from './MotionOverlay';

interface VideoDetailPageProps {
  title: string;
  titleAr: string;
  contentTitle: string;
  contentTitleAr: string;
  contentDescription: string;
  contentDescriptionAr: string;
  videoPath: string;
  onClose: () => void;
  onHome: () => void;
  language: 'EN' | 'AR';
}

const VideoDetailPage: React.FC<VideoDetailPageProps> = ({
  title,
  titleAr,
  contentTitle,
  contentTitleAr,
  contentDescription,
  contentDescriptionAr,
  videoPath,
  onClose,
  onHome,
  language
}) => {
  const [showVideo, setShowVideo] = React.useState(false);

  return (
    <motion.div
      key="video-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 bg-black overflow-hidden"
    >
      {/* Stars Background */}
      <MotionOverlay type="stars" />

      {!showVideo ? (
        <div className={`relative h-full w-full flex items-center justify-between px-[8%] py-[6%] pt-32 pb-40 gap-12 overflow-hidden ${language === 'AR' ? 'flex-row-reverse text-right' : ''}`}>
          {/* Content Side */}
          <div className="flex-1 max-w-3xl">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white text-6xl font-bold mb-8 leading-tight"
            >
              {language === 'EN' ? contentTitle : contentTitleAr}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-white/80 text-3xl leading-relaxed mb-10"
            >
              {language === 'EN' ? contentDescription : contentDescriptionAr}
            </motion.p>

            {/* Key Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mb-8"
            >
              <h2 className={`text-white text-4xl font-bold mb-6 flex items-center gap-3 ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
                <div className="w-1 h-10 bg-[#3DAE2B]" />
                {language === 'EN' ? 'Key Features' : 'الميزات الرئيسية'}
              </h2>
              <ul className="space-y-4 text-white/70 text-2xl">
                <li className={`flex items-start gap-4 ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-3 h-3 bg-[#3DAE2B] rounded-full mt-2 flex-shrink-0" />
                  <span>{language === 'EN' ? 'Instant virtual card creation' : 'إنشاء بطاقة افتراضية فورية'}</span>
                </li>
                <li className={`flex items-start gap-4 ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-3 h-3 bg-[#3DAE2B] rounded-full mt-2 flex-shrink-0" />
                  <span>{language === 'EN' ? 'Real-time transaction monitoring' : 'مراقبة المعاملات في الوقت الفعلي'}</span>
                </li>
                <li className={`flex items-start gap-4 ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-3 h-3 bg-[#3DAE2B] rounded-full mt-2 flex-shrink-0" />
                  <span>{language === 'EN' ? 'Customizable spending limits' : 'حدود إنفاق قابلة للتخصيص'}</span>
                </li>
                <li className={`flex items-start gap-4 ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-3 h-3 bg-[#3DAE2B] rounded-full mt-2 flex-shrink-0" />
                  <span>{language === 'EN' ? 'Multi-currency support' : 'دعم متعدد العملات'}</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Video Demo Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="flex-shrink-0 w-[450px]"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowVideo(true)}
              className="w-full bg-gradient-to-br from-[#3DAE2B] to-[#2d8a1f] rounded-3xl p-12 border border-white/10 shadow-2xl overflow-hidden group relative"
            >
              {/* Play button icon */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-32 h-32 mx-auto mb-8 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors"
              >
                <Play size={64} className="text-white ml-2" fill="white" />
              </motion.div>

              <h3 className="text-white text-3xl font-bold mb-4">
                {language === 'EN' ? `${title} Demo:` : `عرض توضيحي ${titleAr}:`}
              </h3>
              <p className="text-white text-2xl mb-2">
                {language === 'EN' ? 'Issue cards in seconds' : 'إصدار البطاقات في ثوانٍ'}
              </p>
              <p className="text-white/60 text-lg">
                {language === 'EN' ? 'Interactive demo' : 'عرض توضيحي تفاعلي'}
              </p>
            </motion.button>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="relative w-full h-full flex items-center justify-center p-16 pt-32 pb-40"
        >
          {/* Close Video Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowVideo(false)}
            className="absolute top-24 right-24 z-50 w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <X size={32} />
          </motion.button>

          <video
            controls
            autoPlay
            className="w-full h-full max-w-7xl max-h-[60vh] object-contain rounded-2xl shadow-2xl"
            src={videoPath}
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>
      )}

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

export default VideoDetailPage;

