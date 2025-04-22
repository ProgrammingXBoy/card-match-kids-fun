
import React, { useState, useEffect } from 'react';
import MemoryCard from './MemoryCard';
import { CardType, cardPairs } from '@/data/cardImages';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface GameBoardProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onGameComplete: (score: number, moves: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ difficulty, onGameComplete }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const isMobile = useIsMobile();

  // Set number of card pairs based on difficulty
  const getPairsCount = () => {
    switch(difficulty) {
      case 'easy': return 6;
      case 'medium': return 8;
      case 'hard': return 10;
      default: return 6;
    }
  };

  // Random card colors for the back of the cards
  const cardBackColors = [
    'game-blue',
    'game-red',
    'game-green',
    'game-purple',
    'game-pink'
  ];
  const [cardBackColor, setCardBackColor] = useState(cardBackColors[0]);

  // Initialize game
  useEffect(() => {
    // Shuffle and select random card pairs based on difficulty
    const numPairs = getPairsCount();
    const shuffledPairs = [...cardPairs].sort(() => Math.random() - 0.5).slice(0, numPairs);
    
    // Double the cards and assign IDs
    const gameCards = [...shuffledPairs, ...shuffledPairs].map((card, index) => ({
      ...card,
      id: index,
      matched: false
    }));
    
    // Shuffle the final deck
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    
    // Reset game state
    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setIsDisabled(false);

    // Random card back color
    setCardBackColor(cardBackColors[Math.floor(Math.random() * cardBackColors.length)]);
  }, [difficulty]);

  // Handle card click
  const handleCardClick = (card: CardType) => {
    // Prevent clicking when two cards are already flipped
    if (isDisabled || flipped.length === 2) return;
    
    // Update flipped state
    setFlipped(prev => [...prev, card.id]);
    
    // Check for a match when second card is flipped
    if (flipped.length === 1) {
      setMoves(prev => prev + 1);
      const firstCardId = flipped[0];
      const firstCard = cards.find(c => c.id === firstCardId);
      const secondCard = card;
      
      // If cards match
      if (firstCard && firstCard.name === secondCard.name) {
        setIsDisabled(true);
        setMatched(prev => [...prev, firstCardId, secondCard.id]);
        
        // Show match toast
        toast("Great job!", {
          description: `You found a match! 🎉`,
        });
        
        setTimeout(() => {
          setFlipped([]);
          setIsDisabled(false);
        }, 1000);
      } else {
        // If cards don't match, flip them back
        setIsDisabled(true);
        setTimeout(() => {
          setFlipped([]);
          setIsDisabled(false);
        }, 1000);
      }
    }
  };

  // Check if game is complete
  useEffect(() => {
    if (matched.length > 0 && matched.length === cards.length) {
      setTimeout(() => {
        // Calculate score: 100 points per match, minus 5 points per move
        const baseScore = (matched.length / 2) * 100;
        const score = Math.max(baseScore - (moves * 5), 0);
        onGameComplete(score, moves);
      }, 1000);
    }
  }, [matched, cards, moves, onGameComplete]);

  // Calculate grid columns based on difficulty and screen size
  const getGridCols = () => {
    if (isMobile) {
      return difficulty === 'easy' ? 3 : 4;
    }
    switch(difficulty) {
      case 'easy': return 4;
      case 'medium': return 4;
      case 'hard': return 5;
      default: return 4;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-bold">Moves: {moves}</div>
        <div className="text-xl font-bold">
          Matches: {matched.length / 2} / {cards.length / 2}
        </div>
      </div>
      
      <motion.div 
        className={`grid grid-cols-${getGridCols()} gap-3 md:gap-4`}
        style={{ 
          gridTemplateColumns: `repeat(${getGridCols()}, minmax(0, 1fr))` 
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {cards.map((card) => (
          <div 
            key={card.id} 
            className="aspect-square"
          >
            <MemoryCard 
              card={card}
              isFlipped={flipped.includes(card.id) || matched.includes(card.id)}
              isDisabled={isDisabled || matched.includes(card.id)}
              onClick={handleCardClick}
              cardBackColor={cardBackColor}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default GameBoard;
