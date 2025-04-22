
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
      description: `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} mode`,
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
    <div className="min-h-screen py-6 px-4 bg-gradient-to-b from-game-purple/5 to-game-blue/5 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-game-blue via-game-purple to-game-pink bg-clip-text text-transparent mb-2"
            initial={{ scale: 0.95 }}
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
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 bg-game-red/10 text-game-red rounded-full text-xs">2 Players</span>
            <span className="inline-block px-3 py-1 bg-game-blue/10 text-game-blue rounded-full text-xs">Match Cards</span>
          </motion.div>
        </motion.div>
        
        {!gameStarted ? (
          <motion.div 
            className="max-w-sm mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="backdrop-blur-lg bg-white/5 border-white/10 shadow-md">
              <CardContent className="p-5">
                <h2 className="text-xl font-bold text-center mb-5 bg-gradient-to-r from-game-blue to-game-purple bg-clip-text text-transparent">Select Difficulty</h2>
                
                <Tabs defaultValue={difficulty} onValueChange={(value) => setDifficulty(value as 'easy' | 'medium' | 'hard')} className="mb-6">
                  <TabsList className="grid grid-cols-3 mb-3 bg-black/5">
                    <TabsTrigger value="easy" className="text-sm data-[state=active]:bg-game-green/80 data-[state=active]:text-white">Easy</TabsTrigger>
                    <TabsTrigger value="medium" className="text-sm data-[state=active]:bg-game-blue/80 data-[state=active]:text-white">Medium</TabsTrigger>
                    <TabsTrigger value="hard" className="text-sm data-[state=active]:bg-game-purple/80 data-[state=active]:text-white">Hard</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="easy" className="text-center p-2 bg-black/5 rounded">
                    <p className="text-sm">6 pairs</p>
                  </TabsContent>
                  <TabsContent value="medium" className="text-center p-2 bg-black/5 rounded">
                    <p className="text-sm">8 pairs</p>
                  </TabsContent>
                  <TabsContent value="hard" className="text-center p-2 bg-black/5 rounded">
                    <p className="text-sm">10 pairs</p>
                  </TabsContent>
                </Tabs>
                
                <div className="text-center">
                  <Button 
                    onClick={handleStartGame} 
                    className="bg-game-green hover:bg-game-green/90 text-white text-base py-5 px-8 shadow-md shadow-game-green/10"
                  >
                    Start Game
                  </Button>
                </div>
              </CardContent>
            </Card>
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
      </div>
    </div>
  );
};

export default Index;
