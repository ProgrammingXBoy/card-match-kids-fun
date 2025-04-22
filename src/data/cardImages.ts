
export type CardType = {
  id: number;
  name: string;
  emoji: string;
  matched: boolean;
};

export type Player = {
  id: 1 | 2;
  name: string;
  color: string;
  score: number;
};

export const cardPairs = [
  { name: 'dog', emoji: '🐶' },
  { name: 'cat', emoji: '🐱' },
  { name: 'rabbit', emoji: '🐰' },
  { name: 'fox', emoji: '🦊' },
  { name: 'bear', emoji: '🐻' },
  { name: 'panda', emoji: '🐼' },
  { name: 'lion', emoji: '🦁' },
  { name: 'tiger', emoji: '🐯' },
  { name: 'monkey', emoji: '🐵' },
  { name: 'penguin', emoji: '🐧' },
  { name: 'duck', emoji: '🦆' },
  { name: 'chicken', emoji: '🐔' },
  { name: 'horse', emoji: '🐴' },
  { name: 'cow', emoji: '🐮' },
  { name: 'pig', emoji: '🐷' },
  { name: 'elephant', emoji: '🐘' },
];

export const PLAYER_COLORS = {
  1: 'game-red',   // Player 1 color
  2: 'game-blue',  // Player 2 color
};
