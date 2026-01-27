import React from 'react';
import { motion } from 'framer-motion';
import { CardData } from '../types';

interface CardGridProps {
  cards: CardData[];
  onCardClick: (detailState: any) => void;
  language: 'EN' | 'AR';
  type?: 'retail' | 'corporate';
}

const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick, language, type = 'retail' }) => {
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

  // Determine hover color based on type
  const hoverColor = type === 'retail' ? '#3DAE2B' : '#002D74';
  const hoverColorRgba = type === 'retail' ? 'rgba(61, 174, 43, 0.3)' : 'rgba(0, 45, 116, 0.3)';

  // For Arabic: switch left and right columns
  const displayCards = language === 'AR'
    ? cards.map((card, idx) => {
        // If even index (left column), move to odd position (right column) and vice versa
        const isLeftColumn = idx % 2 === 0;
        return isLeftColumn ? cards[idx + 1] || card : cards[idx - 1] || card;
      })
    : cards;

  return (
    <div className="grid grid-cols-2 gap-5 max-w-5xl">
      {displayCards.map((card, idx) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            backgroundColor: hoveredCard === card.id ? hoverColor : '#1a1a1a'
          }}
          transition={{
            delay: 0.5 + idx * 0.1,
            type: "spring",
            stiffness: 100,
            backgroundColor: { duration: 0.3 }
          }}
          whileHover={{ scale: 1.08, y: -10 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCardClick(card.detailState)}
          onHoverStart={() => setHoveredCard(card.id)}
          onHoverEnd={() => setHoveredCard(null)}
          className="relative backdrop-blur-xl rounded-3xl p-8 border border-white/10 cursor-pointer shadow-2xl overflow-hidden group"
        >
          {/* Animated border glow on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: hoveredCard === card.id ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              boxShadow: `0 0 40px ${hoverColorRgba}, inset 0 0 40px ${hoverColorRgba}`
            }}
          />

          {/* Radial rays on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{
              opacity: hoveredCard === card.id ? 0.2 : 0,
              rotate: hoveredCard === card.id ? 360 : 0,
            }}
            transition={{
              opacity: { duration: 0.3 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
            style={{
              background: `
                repeating-conic-gradient(
                  from 0deg,
                  transparent 0deg,
                  transparent 8deg,
                  rgba(255, 255, 255, 0.1) 8deg,
                  rgba(255, 255, 255, 0.1) 10deg,
                  transparent 10deg,
                  transparent 18deg
                )
              `,
            }}
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
          <h3 className="relative z-10 text-white text-4xl font-bold text-center">
            {language === 'EN' ? card.title : card.titleAr}
          </h3>
        </motion.div>
      ))}
    </div>
  );
};

export default CardGrid;

