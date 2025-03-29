import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore } from '@/store/gameStore';

export default function GameOver() {
  const { players, resetGame } = useGameStore();

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  const handlePlayAgain = () => {
    resetGame();
    router.push('/');
  };

  return (
    <LinearGradient
      colors={['#1a237e', '#3949ab', '#5c6bc0']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.congratsText}>Tebrikler!</Text>
        <View style={styles.winnerContainer}>
          <Text style={styles.winnerText}>{winner.name}</Text>
          <Text style={styles.winnerScore}>{winner.score} Puan</Text>
        </View>

        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Sonuçlar</Text>
          {sortedPlayers.slice(1).map((player, index) => (
            <View key={index} style={styles.playerResult}>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.playerScore}>{player.score} Puan</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.playAgainButton}
          onPress={handlePlayAgain}
        >
          <Text style={styles.playAgainText}>Tekrar Oyna</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  congratsText: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 30,
  },
  winnerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  winnerText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  winnerScore: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#4CAF50',
  },
  resultsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginBottom: 40,
  },
  resultsTitle: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  playerResult: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  playerName: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
  },
  playerScore: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  playAgainButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  playAgainText: {
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
});