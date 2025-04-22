
import React, { useState, useEffect } from 'react';
import MemoryCard from './MemoryCard';
import { CardType, cardPairs, Player, PLAYER_COLORS } from '@/data/cardImages';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface GameBoardProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onGameComplete: (score: number, moves: number, winner: string) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ difficulty, onGameComplete }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const isMobile = useIsMobile();
  
  // Two player game state
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'Player 1', color: PLAYER_COLORS[1], score: 0 },
    { id: 2, name: 'Player 2', color: PLAYER_COLORS[2], score: 0 },
  ]);
  
  // Futuristic UI animation state
  const [showTurnAnimation, setShowTurnAnimation] = useState(false);

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
    setCurrentPlayer(1);
    setPlayers([
      { id: 1, name: 'Player 1', color: PLAYER_COLORS[1], score: 0 },
      { id: 2, name: 'Player 2', color: PLAYER_COLORS[2], score: 0 },
    ]);

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
      
      setIsDisabled(true);
      
      // If cards match
      if (firstCard && firstCard.name === secondCard.name) {
        setMatched(prev => [...prev, firstCardId, secondCard.id]);
        
        // Update current player's score
        setPlayers(prevPlayers => 
          prevPlayers.map(player => 
            player.id === currentPlayer
              ? { ...player, score: player.score + 1 }
              : player
          )
        );
        
        // Show match toast with player color
        const currentPlayerColor = players.find(p => p.id === currentPlayer)?.color || 'game-blue';
        toast("Match found!", {
          description: `Player ${currentPlayer} found a match! 🎉`,
          className: `border-${currentPlayerColor} border-l-4`,
        });
        
        setTimeout(() => {
          setFlipped([]);
          setIsDisabled(false);
          // Same player continues if they found a match
        }, 1000);
      } else {
        // If cards don't match, flip them back and switch players
        setTimeout(() => {
          setFlipped([]);
          setIsDisabled(false);
          
          // Switch to other player
          setCurrentPlayer(prev => prev === 1 ? 2 : 1);
          
          // Show player turn change animation
          setShowTurnAnimation(true);
          setTimeout(() => setShowTurnAnimation(false), 1500);
          
        }, 1000);
      }
    }
  };

  // Check if game is complete
  useEffect(() => {
    if (matched.length > 0 && matched.length === cards.length) {
      setTimeout(() => {
        // Determine winner
        const player1 = players.find(p => p.id === 1);
        const player2 = players.find(p => p.id === 2);
        let winner = "It's a tie!";
        
        if (player1 && player2) {
          if (player1.score > player2.score) {
            winner = `${player1.name} wins!`;
          } else if (player2.score > player1.score) {
            winner = `${player2.name} wins!`;
          }
        }
        
        // Calculate total score
        const totalScore = (matched.length / 2) * 100;
        onGameComplete(totalScore, moves, winner);
      }, 1000);
    }
  }, [matched, cards, moves, onGameComplete, players]);

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

  // Get current player
  const activePlayer = players.find(p => p.id === currentPlayer) || players[0];
  
  // Calculate match progress percentage
  const progressPercentage = matched.length > 0 
    ? (matched.length / cards.length) * 100 
    : 0;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Player turn indicator with animation */}
      <AnimatePresence>
        {showTurnAnimation && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`text-5xl md:text-7xl font-bold text-${activePlayer.color} text-center`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {activePlayer.name}'s Turn!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game stats and player information */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Player stats */}
        <Card className="bg-black/5 backdrop-blur-sm border-white/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              {players.map((player) => (
                <div 
                  key={player.id} 
                  className={cn(
                    "flex-1 p-2 rounded-lg transition-all",
                    currentPlayer === player.id 
                      ? `bg-${player.color}/10 border-l-4 border-${player.color} shadow-md` 
                      : "opacity-70"
                  )}
                >
                  <div className="text-center">
                    <h3 className={`font-bold text-${player.color}`}>{player.name}</h3>
                    <div className="text-xl font-bold">{player.score}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Game progress */}
        <Card className="bg-black/5 backdrop-blur-sm border-white/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <div>Moves: <span className="font-bold">{moves}</span></div>
              <div>
                Matches: <span className="font-bold">{matched.length / 2} / {cards.length / 2}</span>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>
      </div>
      
      {/* Active player indicator */}
      <motion.div 
        className={`mb-4 text-center text-lg font-bold text-${activePlayer.color}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-center gap-2">
          <span className={`inline-block w-3 h-3 rounded-full bg-${activePlayer.color} animate-pulse`}></span>
          {activePlayer.name}'s Turn
        </div>
      </motion.div>
      
      {/* Game board */}
      <motion.div 
        className="w-full overflow-hidden rounded-xl bg-black/5 backdrop-blur-md p-3 md:p-4 border border-white/10 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="grid gap-2 md:gap-4"
          style={{ 
            gridTemplateColumns: `repeat(${getGridCols()}, minmax(0, 1fr))` 
          }}
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
        </div>
      </motion.div>
    </div>
  );
};

export default GameBoard;
