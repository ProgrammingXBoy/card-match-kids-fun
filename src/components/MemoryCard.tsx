
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
        "game-card w-full h-full",
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
        whileHover={!isFlipped && !isDisabled ? { scale: 1.05 } : {}}
        whileTap={!isFlipped && !isDisabled ? { scale: 0.95 } : {}}
      >
        {/* Card Back (Pattern) */}
        <div 
          className={cn(
            "game-card-front flex items-center justify-center rounded-xl",
            `bg-${cardBackColor} border-4 border-white shadow-lg`
          )}
        >
          <motion.div 
            className="text-white text-5xl font-bold"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            ?
          </motion.div>
        </div>
        
        {/* Card Front (Animal) */}
        <div className="game-card-back bg-white rounded-xl border-4 border-game-yellow flex items-center justify-center shadow-lg">
          <motion.span 
            className="text-6xl"
            initial={{ scale: 0 }}
            animate={isFlipped ? { scale: 1, rotate: [0, 10, 0, -10, 0] } : { scale: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {card.emoji}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};

export default MemoryCard;
