import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, X, QrCode } from 'lucide-react';
import { ExperienceState } from '../types';

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
  type?: 'retail' | 'corporate';
  isDAwards?: boolean;
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
  language,
  type = 'retail',
  isDAwards = false
}) => {
  const [showVideo, setShowVideo] = React.useState(false);

  const qrColor = type === 'retail' ? '#3DAE2B' : '#002D74';

  return (
    <motion.div
      key="video-detail"
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

      {!showVideo ? (
        // New Unified Layout: Title, 2-column text (if long), video + QR at bottom
        <div className={`relative h-full w-full flex flex-col ${isDAwards ? 'justify-start pt-40' : 'justify-center pt-44'} px-[8%] pb-40 ${language === 'AR' ? 'text-right' : 'text-left'}`}>
          {/* Title - Full Width, Left Aligned */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`text-white font-bold leading-tight ${
              isDAwards ? 'text-4xl mb-6' : 'text-7xl mb-10'
            }`}
          >
            {language === 'EN' ? contentTitle : contentTitleAr}
          </motion.h1>

          {/* Content - 2 columns if text is long, left aligned, larger font */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className={`text-white/90 whitespace-pre-line ${
              isDAwards
                ? 'text-base leading-snug columns-2 gap-10 mb-8'
                : (language === 'EN' ? contentDescription : contentDescriptionAr).length > 600
                  ? 'text-3xl leading-relaxed columns-2 gap-16 mb-12'
                  : 'text-3xl leading-relaxed max-w-6xl mb-12'
            }`}
            style={{
              direction: language === 'AR' ? 'rtl' : 'ltr'
            }}
            dangerouslySetInnerHTML={{
              __html: (language === 'EN' ? contentDescription : contentDescriptionAr)
                .replace(/Key Benefits/g, '<strong>Key Benefits</strong>')
                .replace(/Highlights/g, '<strong>Highlights</strong>')
                .replace(/المزايا الرئيسية/g, '<strong>المزايا الرئيسية</strong>')
                .replace(/• /g, '<span style="font-size: 1.2em; margin-right: 0.3em;">•</span> ')
            }}
          />

          {/* Cards at the bottom - Side by Side */}
          <div className={`flex gap-6 mt-auto ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
            {/* Video Demo Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex-1 max-w-md"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowVideo(true)}
                className={`w-full bg-gradient-to-br ${
                  type === 'retail'
                    ? 'from-[#3DAE2B] to-[#2d8a1f]'
                    : 'from-[#002D74] to-[#001a45]'
                } rounded-2xl p-6 border border-white/10 shadow-2xl overflow-hidden group relative`}
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
                  className="w-20 h-20 mx-auto mb-4 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors"
                >
                  <Play size={40} className="text-white ml-1" fill="white" />
                </motion.div>

                <h3 className="text-white text-xl font-bold mb-2">
                  {language === 'EN' ? `${title} Demo:` : `عرض توضيحي ${titleAr}:`}
                </h3>
                <p className="text-white text-lg mb-1">
                  {language === 'EN' ? 'Watch Interactive Demo' : 'شاهد العرض التوضيحي التفاعلي'}
                </p>
                <p className="text-white/60 text-sm">
                  {language === 'EN' ? 'Click to play' : 'انقر للتشغيل'}
                </p>
              </motion.button>
            </motion.div>

            {/* QR Code Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex-1 max-w-md bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 flex items-center justify-center"
            >
              <div className="flex flex-col items-center">
                {/* QR Code Icon Placeholder */}
                <div
                  className="w-32 h-32 rounded-xl flex items-center justify-center border-4"
                  style={{
                    backgroundColor: 'white',
                    borderColor: qrColor
                  }}
                >
                  <QrCode size={96} style={{ color: qrColor }} />
                </div>
              </div>
            </motion.div>
          </div>
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

