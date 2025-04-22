
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameBoard from '@/components/GameBoard';
import GameComplete from '@/components/GameComplete';
import { motion } from 'framer-motion';
import { toast } from "sonner";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  const handleStartGame = () => {
    setGameStarted(true);
    setGameComplete(false);
    
    toast("Game Started!", {
      description: `Good luck on ${difficulty} mode!`,
    });
  };

  const handleGameComplete = (finalScore: number, finalMoves: number) => {
    setScore(finalScore);
    setMoves(finalMoves);
    setGameComplete(true);
    
    toast("Congratulations! 🎉", {
      description: "You've completed the memory game!",
    });
  };

  const handlePlayAgain = () => {
    setGameComplete(false);
    setGameStarted(false);
    setTimeout(() => {
      setGameStarted(true);
    }, 100);
  };

  const handleChangeDifficulty = () => {
    setGameComplete(false);
    setGameStarted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-blue/20 to-game-purple/20 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-game-blue mb-2">
            Memory Match
          </h1>
          <p className="text-xl text-gray-600">
            Find all the matching pairs!
          </p>
        </motion.div>
        
        {!gameStarted ? (
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-lg max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-center mb-6">Choose Difficulty</h2>
            
            <Tabs defaultValue={difficulty} onValueChange={(value) => setDifficulty(value as 'easy' | 'medium' | 'hard')} className="mb-8">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="easy" className="text-lg">Easy</TabsTrigger>
                <TabsTrigger value="medium" className="text-lg">Medium</TabsTrigger>
                <TabsTrigger value="hard" className="text-lg">Hard</TabsTrigger>
              </TabsList>
              
              <TabsContent value="easy" className="text-center">
                <p className="mb-2 text-lg">6 pairs to match</p>
                <p className="text-gray-600">Perfect for younger children!</p>
              </TabsContent>
              <TabsContent value="medium" className="text-center">
                <p className="mb-2 text-lg">8 pairs to match</p>
                <p className="text-gray-600">A good challenge!</p>
              </TabsContent>
              <TabsContent value="hard" className="text-center">
                <p className="mb-2 text-lg">10 pairs to match</p>
                <p className="text-gray-600">For memory masters!</p>
              </TabsContent>
            </Tabs>
            
            <div className="text-center">
              <Button 
                onClick={handleStartGame} 
                size="lg"
                className="bg-game-green hover:bg-game-green/90 text-white text-xl py-6 px-10"
              >
                Start Game
              </Button>
            </div>
          </motion.div>
        ) : gameComplete ? (
          <GameComplete 
            score={score} 
            moves={moves} 
            onPlayAgain={handlePlayAgain}
            onChangeDifficulty={handleChangeDifficulty}
          />
        ) : (
          <GameBoard 
            difficulty={difficulty} 
            onGameComplete={handleGameComplete}
          />
        )}
        
        {/* Instructions */}
        {gameStarted && !gameComplete && (
          <motion.div 
            className="mt-8 bg-white bg-opacity-90 p-4 rounded-lg max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-bold text-lg mb-2">How to Play:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Click on cards to flip them over</li>
              <li>Remember what's on each card</li>
              <li>Find all matching pairs</li>
              <li>Try to use as few moves as possible</li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
