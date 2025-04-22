
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

  // Determine border color based on the card back color
  const getBorderColor = () => {
    return cardBackColor === 'game-red' ? 'border-game-red' : 'border-game-blue';
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
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={!isFlipped && !isDisabled ? { scale: 1.03 } : {}}
        whileTap={!isFlipped && !isDisabled ? { scale: 0.97 } : {}}
      >
        {/* Card Back */}
        <div 
          className={cn(
            "game-card-front flex items-center justify-center rounded-xl",
            `bg-${cardBackColor}/80 border-2 ${getBorderColor()} shadow-lg`,
            "overflow-hidden"
          )}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Diamond Background Image */}
            <img 
              src="/lovable-uploads/900fc825-c954-46ce-b595-7b5b697ff27e.png" 
              alt="Diamond" 
              className="absolute w-3/4 h-3/4 object-contain opacity-20"
            />
            <motion.div 
              className="text-white/90 text-4xl font-bold relative z-10"
              animate={{ opacity: [0.7, 0.9, 0.7] }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              ?
            </motion.div>
          </div>
        </div>
        
        {/* Card Front */}
        <div className={cn(
          "game-card-back bg-white/90 backdrop-blur-sm rounded-xl border-2",
          getBorderColor(),
          "flex items-center justify-center shadow-lg overflow-hidden"
        )}>
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Diamond Background Image */}
            <img 
              src="/lovable-uploads/900fc825-c954-46ce-b595-7b5b697ff27e.png" 
              alt="Diamond" 
              className="absolute w-full h-full object-contain opacity-10"
            />
            <motion.span 
              className="text-5xl relative z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={isFlipped ? { 
                scale: 1, 
                opacity: 1,
                rotate: [0, 5, 0, -5, 0] 
              } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {card.emoji}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemoryCard;
