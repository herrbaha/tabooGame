import { create } from 'zustand';

interface Player {
  name: string;
  score: number;
}

interface GameState {
  players: Player[];
  selectedPlayerCount: number;
  selectedTime: number;
  targetScore: number;
  passCount: number;
  currentRound: number;
  setPlayerCount: (count: number) => void;
  setPlayers: (players: Player[]) => void;
  setTime: (time: number) => void;
  setTargetScore: (score: number) => void;
  setPassCount: (count: number) => void;
  updatePlayerScore: (index: number, score: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  players: [],
  selectedPlayerCount: 2,
  selectedTime: 60,
  targetScore: 30,
  passCount: 3,
  currentRound: 1,

  setPlayerCount: (count) => set({ selectedPlayerCount: count }),
  setPlayers: (players) => set({ players }),
  setTime: (time) => set({ selectedTime: time }),
  setTargetScore: (score) => set({ targetScore: score }),
  setPassCount: (count) => set({ passCount: count }),
  updatePlayerScore: (index, score) =>
    set((state) => ({
      players: state.players.map((player, i) =>
        i === index ? { ...player, score } : player
      ),
    })),
  resetGame: () =>
    set({
      players: [],
      selectedPlayerCount: 2,
      selectedTime: 60,
      targetScore: 30,
      passCount: 3,
      currentRound: 1,
    }),
}));
export interface TabooWord {
  word: string;
  tabooWords: string[];
  level?: string;
}