
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import confetti from 'canvas-confetti';

interface GameCompleteProps {
  score: number;
  moves: number;
  winner: string;
  onPlayAgain: () => void;
  onChangeDifficulty: () => void;
}

const GameComplete: React.FC<GameCompleteProps> = ({ 
  score, 
  moves, 
  winner,
  onPlayAgain,
  onChangeDifficulty
}) => {
  // Trigger confetti effect when component mounts
  React.useEffect(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const runConfetti = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF6B6B', '#4A9DFF']
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#4A9DFF', '#FF6B6B']
      });

      if (Date.now() < end) {
        requestAnimationFrame(runConfetti);
      }
    };

    runConfetti();
  }, []);

  return (
    <motion.div 
      className="max-w-xs mx-auto"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="backdrop-blur-lg bg-white/5 border-white/10 shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-game-blue/10 via-game-purple/10 to-game-pink/10 z-0"></div>
        
        <CardContent className="p-5 relative z-10">
          <motion.div 
            className="text-5xl mb-3 mx-auto w-16 h-16 flex items-center justify-center"
            animate={{ 
              rotate: [0, 5, -5, 5, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            🏆
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-game-blue via-game-purple to-game-pink bg-clip-text text-transparent text-center">
              Game Complete
            </h2>
            
            <motion.div
              className="text-lg mb-4 font-medium text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {winner}
            </motion.div>
            
            <div className="bg-black/5 rounded p-3 mb-4">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-xs text-gray-500">Score</p>
                  <p className="text-xl font-bold">{score}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Moves</p>
                  <p className="text-xl font-bold">{moves}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col gap-2 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              variant="default"
              onClick={onPlayAgain}
              className="bg-game-green hover:bg-game-green/90 text-white shadow-sm"
            >
              Play Again
            </Button>
            
            <Button
              variant="outline"
              onClick={onChangeDifficulty}
              className="border-game-blue text-game-blue hover:bg-game-blue/5"
            >
              Change Difficulty
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GameComplete;
