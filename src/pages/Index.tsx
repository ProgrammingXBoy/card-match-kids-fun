
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameBoard from '@/components/GameBoard';
import GameComplete from '@/components/GameComplete';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [winner, setWinner] = useState('');

  const handleStartGame = () => {
    setGameStarted(true);
    setGameComplete(false);
    
    toast("Game Started!", {
      description: `Good luck on ${difficulty} mode! Two players, let's go!`,
    });
  };

  const handleGameComplete = (finalScore: number, finalMoves: number, gameWinner: string) => {
    setScore(finalScore);
    setMoves(finalMoves);
    setWinner(gameWinner);
    setGameComplete(true);
    
    toast("Game Complete! 🎉", {
      description: `${gameWinner}`,
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
    <div className="min-h-screen py-6 px-4 bg-gradient-to-b from-game-purple/10 to-game-blue/10 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-game-blue via-game-purple to-game-pink bg-clip-text text-transparent mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.5, 
              type: "spring", 
              stiffness: 200,
              damping: 10
            }}
          >
            Memory Match
          </motion.h1>
          <motion.div 
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-block px-3 py-1 bg-game-red/20 text-game-red rounded-full text-sm font-medium">2 Players</span>
            <span className="inline-block px-3 py-1 bg-game-blue/20 text-game-blue rounded-full text-sm font-medium">Head to Head</span>
            <span className="inline-block px-3 py-1 bg-game-green/20 text-game-green rounded-full text-sm font-medium">Memory Challenge</span>
          </motion.div>
        </motion.div>
        
        {!gameStarted ? (
          <motion.div 
            className="max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-game-blue to-game-purple bg-clip-text text-transparent">Choose Difficulty</h2>
                
                <Tabs defaultValue={difficulty} onValueChange={(value) => setDifficulty(value as 'easy' | 'medium' | 'hard')} className="mb-8">
                  <TabsList className="grid grid-cols-3 mb-4 bg-black/10">
                    <TabsTrigger value="easy" className="text-lg data-[state=active]:bg-game-green/90 data-[state=active]:text-white">Easy</TabsTrigger>
                    <TabsTrigger value="medium" className="text-lg data-[state=active]:bg-game-blue/90 data-[state=active]:text-white">Medium</TabsTrigger>
                    <TabsTrigger value="hard" className="text-lg data-[state=active]:bg-game-purple/90 data-[state=active]:text-white">Hard</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="easy" className="text-center p-4 bg-black/5 rounded-lg">
                    <p className="mb-2 text-lg font-medium">6 pairs to match</p>
                    <p className="text-gray-600">Perfect for younger children!</p>
                  </TabsContent>
                  <TabsContent value="medium" className="text-center p-4 bg-black/5 rounded-lg">
                    <p className="mb-2 text-lg font-medium">8 pairs to match</p>
                    <p className="text-gray-600">A good challenge!</p>
                  </TabsContent>
                  <TabsContent value="hard" className="text-center p-4 bg-black/5 rounded-lg">
                    <p className="mb-2 text-lg font-medium">10 pairs to match</p>
                    <p className="text-gray-600">For memory masters!</p>
                  </TabsContent>
                </Tabs>
                
                <div className="text-center">
                  <Button 
                    onClick={handleStartGame} 
                    size="lg"
                    className="bg-game-green hover:bg-game-green/90 text-white text-xl py-6 px-10 shadow-lg shadow-game-green/20"
                  >
                    Start 2-Player Game
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Player instructions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                className="bg-game-red/10 border border-game-red/20 p-4 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="font-bold text-lg text-game-red mb-2">Player 1</h3>
                <p className="text-sm">Find matching pairs to score points. If you find a match, you get another turn!</p>
              </motion.div>
              
              <motion.div 
                className="bg-game-blue/10 border border-game-blue/20 p-4 rounded-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="font-bold text-lg text-game-blue mb-2">Player 2</h3>
                <p className="text-sm">Remember card positions and try to match more pairs than your opponent!</p>
              </motion.div>
            </div>
          </motion.div>
        ) : gameComplete ? (
          <GameComplete 
            score={score} 
            moves={moves} 
            winner={winner}
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
            className="mt-8 bg-white/10 backdrop-blur-sm p-4 rounded-lg max-w-md mx-auto border border-white/20 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-bold text-lg mb-2">How to Play:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Take turns to flip over two cards</li>
              <li>If they match, you score a point and go again</li>
              <li>If they don't match, it's the other player's turn</li>
              <li>Remember the positions to find matches on your turn</li>
              <li>The player with the most matches wins!</li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
