import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore } from '@/store/gameStore';
import { TABOO_WORDS } from '@/constants/words';
import { useEffect, useState } from 'react';

export default function Game() {
  const { players, selectedTime, updatePlayerScore } = useGameStore();
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(selectedTime);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeLeft === 0) {
      endTurn();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const endTurn = () => {
    updatePlayerScore(currentPlayer, score);

    const playerWithScore = players.find(player => player.score >= 10);
    if (playerWithScore) {
      router.push('/game-over');
    } else {
      setCurrentPlayer(prev => (prev + 1) % players.length);
      setScore(0);
      setTimeLeft(selectedTime);
    }
  };

  const handleCorrect = () => {
    setScore((prev) => prev + 1);
    setCurrentWordIndex((prev) => (prev + 1) % TABOO_WORDS.length);
  };

  const handlePass = () => {
    setCurrentWordIndex((prev) => (prev + 1) % TABOO_WORDS.length);
  };

  const handleTaboo = () => {
    setScore((prev) => prev - 1);
    setCurrentWordIndex((prev) => (prev + 1) % TABOO_WORDS.length);
  };

  const currentWord = TABOO_WORDS[currentWordIndex];

  return (
    <LinearGradient
      colors={['#1a237e', '#3949ab', '#5c6bc0']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.timer}>{timeLeft}s</Text>
        <Text style={styles.score}>Skor: {score}</Text>
      </View>

      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{players[currentPlayer].name}</Text>
      </View>

      <View style={styles.wordContainer}>
        <Text style={styles.mainWord}>{currentWord.word}</Text>
        <View style={styles.tabooWords}>
          {currentWord.tabooWords.map((word, index) => (
            <Text key={index} style={styles.tabooWord}>{word}</Text>
          ))}
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.tabooButton]}
          onPress={handleTaboo}
        >
          <Text style={styles.buttonText}>Tabu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.passButton]}
          onPress={handlePass}
        >
          <Text style={styles.buttonText}>Pas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.correctButton]}
          onPress={handleCorrect}
        >
          <Text style={styles.buttonText}>Doğru</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  timer: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  score: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  playerInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  playerName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  wordContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  mainWord: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#1a237e',
    marginBottom: 20,
  },
  tabooWords: {
    width: '100%',
  },
  tabooWord: {
    fontSize: 20,
    fontFamily: 'Inter-Regular',
    color: '#e53935',
    textAlign: 'center',
    marginVertical: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  tabooButton: {
    backgroundColor: '#e53935',
  },
  passButton: {
    backgroundColor: '#fb8c00',
  },
  correctButton: {
    backgroundColor: '#43a047',
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
});
