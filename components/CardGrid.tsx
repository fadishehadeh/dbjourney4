import React from 'react';
import { motion } from 'framer-motion';
import { CardData } from '../types';

interface CardGridProps {
  cards: CardData[];
  onCardClick: (detailState: any) => void;
  language: 'EN' | 'AR';
}

const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick, language }) => {
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 gap-5 max-w-5xl">
      {cards.map((card, idx) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5 + idx * 0.1, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCardClick(card.detailState)}
          onHoverStart={() => setHoveredCard(card.id)}
          onHoverEnd={() => setHoveredCard(null)}
          className="relative bg-[#1a1a1a] backdrop-blur-xl rounded-3xl p-8 border border-white/10 cursor-pointer shadow-2xl overflow-hidden"
        >
          {/* Subtle gradient overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: hoveredCard === card.id ? 0.15 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"
          />

          {/* Icon with dark background */}
          <div className="relative z-10 mb-6 flex justify-center">
            <motion.div
              animate={{
                backgroundColor: hoveredCard === card.id
                  ? 'rgba(80, 80, 80, 0.6)'
                  : 'rgba(60, 60, 60, 0.5)'
              }}
              transition={{
                backgroundColor: { duration: 0.3 }
              }}
              className="p-6 rounded-2xl"
            >
              <div className="text-white">
                {React.cloneElement(card.icon as React.ReactElement, { size: 58, strokeWidth: 1.5 })}
              </div>
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="relative z-10 text-white text-4xl font-bold text-center mb-5">
            {language === 'EN' ? card.title : card.titleAr}
          </h3>

          {/* Description */}
          {card.contentDescription && (
            <p className="relative z-10 text-white/60 text-xl text-center leading-relaxed mb-5 px-2">
              {language === 'EN'
                ? card.contentDescription.split('.')[0]
                : card.contentDescriptionAr?.split('.')[0]}
            </p>
          )}

          {/* "Learn more" text */}
          <motion.p
            animate={{
              opacity: hoveredCard === card.id ? 0.8 : 0.5,
            }}
            transition={{ duration: 0.3 }}
            className="relative z-10 text-white/50 text-lg text-center"
          >
            {language === 'EN' ? 'Learn more →' : 'اعرف المزيد ←'}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
};

export default CardGrid;

