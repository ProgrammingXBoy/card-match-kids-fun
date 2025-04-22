
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

  // Messages based on performance
  const getMessage = () => {
    if (moves <= 10) return "Amazing memory!";
    if (moves <= 15) return "Great job!";
    if (moves <= 20) return "Well done!";
    return "Good effort!";
  };

  return (
    <motion.div 
      className="max-w-md mx-auto"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-game-blue/20 via-game-purple/20 to-game-pink/20 z-0"></div>
        
        <CardContent className="p-6 md:p-8 relative z-10">
          <motion.div 
            className="text-6xl mb-4 mx-auto w-20 h-20 flex items-center justify-center"
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.2, 1, 1.2, 1]
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-game-blue via-game-purple to-game-pink bg-clip-text text-transparent text-center">
              Game Complete!
            </h2>
            
            <motion.div
              className="text-xl mb-6 font-semibold text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {winner}
            </motion.div>
            
            <div className="bg-black/5 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-500">Total Score</p>
                  <p className="text-2xl font-bold">{score}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Moves</p>
                  <p className="text-2xl font-bold">{moves}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col md:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button 
              variant="default"
              size="lg"
              onClick={onPlayAgain}
              className="bg-game-green hover:bg-game-green/90 text-white text-lg py-6 shadow-lg shadow-game-green/20"
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
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GameComplete;
