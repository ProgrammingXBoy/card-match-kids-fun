
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface GameCompleteProps {
  score: number;
  moves: number;
  onPlayAgain: () => void;
  onChangeDifficulty: () => void;
}

const GameComplete: React.FC<GameCompleteProps> = ({ 
  score, 
  moves, 
  onPlayAgain,
  onChangeDifficulty
}) => {
  // Messages based on performance
  const getMessage = () => {
    if (moves <= 10) return "Amazing memory!";
    if (moves <= 15) return "Great job!";
    if (moves <= 20) return "Well done!";
    return "Good effort!";
  };

  return (
    <motion.div 
      className="bg-white rounded-xl p-6 md:p-8 shadow-lg max-w-md mx-auto text-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-5xl mb-4"
        animate={{ rotate: [0, 10, -10, 10, 0] }}
        transition={{ duration: 1, repeat: 3 }}
      >
        🎉
      </motion.div>
      
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-game-purple">Game Complete!</h2>
      <h3 className="text-xl mb-4 font-semibold text-game-blue">{getMessage()}</h3>
      
      <div className="space-y-2 mb-6">
        <p className="text-lg"><span className="font-bold">Score:</span> {score} points</p>
        <p className="text-lg"><span className="font-bold">Moves:</span> {moves}</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-3 justify-center">
        <Button 
          variant="default"
          size="lg"
          onClick={onPlayAgain}
          className="bg-game-green hover:bg-game-green/90 text-white text-lg py-6"
        >
          Play Again
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={onChangeDifficulty}
          className="border-game-blue text-game-blue hover:bg-game-blue/10 text-lg py-6"
        >
          Change Difficulty
        </Button>
      </div>
    </motion.div>
  );
};

export default GameComplete;
