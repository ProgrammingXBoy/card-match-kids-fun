
import React from 'react';
import { motion } from 'framer-motion';
import { CardType } from '@/data/cardImages';
import { cn } from '@/lib/utils';

interface MemoryCardProps {
  card: CardType;
  isFlipped: boolean;
  isDisabled: boolean;
  onClick: (card: CardType) => void;
  cardBackColor: string;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ 
  card, 
  isFlipped, 
  isDisabled, 
  onClick, 
  cardBackColor 
}) => {
  const handleClick = () => {
    if (!isDisabled && !isFlipped) {
      onClick(card);
    }
  };

  return (
    <div 
      className={cn(
        "game-card",
        isFlipped && "flipped",
        card.matched && "opacity-70"
      )}
      onClick={handleClick}
    >
      <motion.div 
        className="game-card-inner"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Card Back (Pattern) */}
        <div 
          className={cn(
            "game-card-front flex items-center justify-center",
            `bg-${cardBackColor} border-4 border-white shadow-md`
          )}
        >
          <div className="text-white text-5xl">?</div>
        </div>
        
        {/* Card Front (Animal) */}
        <div className="game-card-back bg-white border-4 border-game-yellow flex items-center justify-center shadow-md">
          <span className="text-6xl">{card.emoji}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default MemoryCard;
