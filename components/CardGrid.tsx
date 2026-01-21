import React from 'react';
import { motion } from 'framer-motion';
import { CardData } from '../types';

interface CardGridProps {
  cards: CardData[];
  onCardClick: (detailState: any) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick }) => {
  return (
    <div className="grid grid-cols-3 gap-8 max-w-7xl">
      {cards.map((card, idx) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5 + idx * 0.1, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.05, y: -10 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCardClick(card.detailState)}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 cursor-pointer shadow-2xl hover:bg-white/15 transition-colors"
        >
          <motion.div
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: idx * 0.2 }}
            className="text-[#3DAE2B] mb-8 flex justify-center"
          >
            {React.cloneElement(card.icon as React.ReactElement, { size: 80, strokeWidth: 1.5 })}
          </motion.div>
          <h3 className="text-white text-4xl font-bold text-center">
            {card.title}
          </h3>
        </motion.div>
      ))}
    </div>
  );
};

export default CardGrid;

