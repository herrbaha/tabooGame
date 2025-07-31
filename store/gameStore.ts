import { create } from "zustand";

interface Player {
  name: string;
  score: number;
  passesUsed: number;
}

interface GameState {
  players: Player[];
  selectedPlayerCount: number;
  selectedTime: number;
  targetScore: number;
  passCount: number;
  currentRound: number;
  maxRounds: number;
  currentPlayer: number;
  timeLeft: number;
  currentScore: number;
  currentWordIndex: number;
  setPlayerCount: (count: number) => void;
  setPlayers: (players: Player[]) => void;
  setTime: (time: number) => void;
  setTargetScore: (score: number) => void;
  setPassCount: (count: number) => void;
  setCurrentRound: (round: number) => void;
  setMaxRounds: (rounds: number) => void;
  setCurrentPlayer: (player: number) => void;
  setTimeLeft: (time: number) => void;
  setCurrentScore: (score: number) => void;
  setCurrentWordIndex: (index: number) => void;
  updatePlayerScore: (index: number, score: number) => void;
  usePass: (playerIndex: number) => boolean;
  resetGame: () => void;
  nextPlayer: () => void;
  nextRound: () => void;
  getRandomWordIndex: () => number;
}

export const useGameStore = create<GameState>((set, get) => ({
  players: [],
  selectedPlayerCount: 2,
  selectedTime: 60,
  targetScore: 30,
  passCount: 3,
  currentRound: 1,
  maxRounds: 2,
  currentPlayer: 0,
  timeLeft: 60,
  currentScore: 0,
  currentWordIndex: 0,

  setPlayerCount: (count) => set({ selectedPlayerCount: count }),
  setPlayers: (players) => set({ players }),
  setTime: (time) => set({ selectedTime: time, timeLeft: time }),
  setTargetScore: (score) => set({ targetScore: score }),
  setPassCount: (count) => set({ passCount: count }),
  setCurrentRound: (round) => set({ currentRound: round }),
  setMaxRounds: (rounds) => set({ maxRounds: rounds }),
  setCurrentPlayer: (player) => set({ currentPlayer: player }),
  setTimeLeft: (time) => set({ timeLeft: time }),
  setCurrentScore: (score) => set({ currentScore: score }),
  setCurrentWordIndex: (index) => set({ currentWordIndex: index }),

  updatePlayerScore: (index, score) =>
    set((state) => ({
      players: state.players.map((player, i) =>
        i === index ? { ...player, score: player.score + score } : player
      ),
    })),

  usePass: (playerIndex) => {
    const state = get();
    const player = state.players[playerIndex];
    if (player.passesUsed < state.passCount) {
      set((state) => ({
        players: state.players.map((p, i) =>
          i === playerIndex ? { ...p, passesUsed: p.passesUsed + 1 } : p
        ),
      }));
      return true;
    }
    return false;
  },

  nextPlayer: () => {
    const state = get();
    const nextPlayer = (state.currentPlayer + 1) % state.players.length;
    set({
      currentPlayer: nextPlayer,
      timeLeft: state.selectedTime,
      currentScore: 0,
      currentWordIndex: (state.currentWordIndex + 1) % 4302, // Sonraki indeks
    });
  },

  nextRound: () => {
    const state = get();
    if (state.currentRound < state.maxRounds) {
      set({
        currentRound: state.currentRound + 1,
        currentPlayer: 0,
        timeLeft: state.selectedTime,
        currentScore: 0,
        currentWordIndex: Math.floor(Math.random() * 4302), // İkinci tur için rastgele başlangıç
        players: state.players.map((p) => ({ ...p, passesUsed: 0 })),
      });
    }
  },

  resetGame: () =>
    set({
      players: [],
      selectedPlayerCount: 2,
      selectedTime: 60,
      targetScore: 30,
      passCount: 3,
      currentRound: 1,
      maxRounds: 2,
      currentPlayer: 0,
      timeLeft: 60,
      currentScore: 0,
      currentWordIndex: Math.floor(Math.random() * 4302), // Rastgele başlangıç
    }),

  getRandomWordIndex: () => {
    // Basit rastgele indeks oluştur
    return Math.floor(Math.random() * 4302);
  },
}));

export interface TabooWord {
  word: string;
  tabooWords: string[];
  level?: string;
}
