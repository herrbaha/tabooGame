import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useGameStore } from "@/store/gameStore";

export default function GameOver() {
  const { players, currentRound, maxRounds, resetGame } = useGameStore();

  // Eğer oyuncu verisi yoksa ana sayfaya yönlendir
  if (!players || players.length === 0) {
    router.push("/");
    return null;
  }

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const isGameFinished = currentRound >= maxRounds;

  const handlePlayAgain = () => {
    resetGame();
    // Ana sayfaya yönlendir
    router.replace("/");
  };

  return (
    <LinearGradient
      colors={["#1a237e", "#3949ab", "#5c6bc0"]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.congratsText}>
          {isGameFinished ? "Oyun Bitti!" : "Tebrikler!"}
        </Text>

        <View style={styles.roundInfo}>
          <Text style={styles.roundText}>{maxRounds} Tur Tamamlandı</Text>
        </View>

        <View style={styles.winnerContainer}>
          <Text style={styles.winnerLabel}>Kazanan</Text>
          <Text style={styles.winnerText}>{winner.name}</Text>
          <Text style={styles.winnerScore}>{winner.score} Puan</Text>
        </View>

        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Final Sıralama</Text>
          {sortedPlayers.map((player, index) => (
            <View key={index} style={styles.playerResult}>
              <View style={styles.playerRank}>
                <Text style={styles.rankText}>{index + 1}</Text>
                <Text style={styles.playerName}>{player.name}</Text>
              </View>
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
    alignItems: "center",
    justifyContent: "center",
  },
  congratsText: {
    fontSize: 48,
    fontFamily: "Inter-Bold",
    color: "#ffffff",
    marginBottom: 20,
  },
  roundInfo: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 10,
    marginBottom: 30,
  },
  roundText: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#ffffff",
  },
  winnerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 40,
    width: "100%",
  },
  winnerLabel: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#ffffff",
    marginBottom: 10,
  },
  winnerText: {
    fontSize: 32,
    fontFamily: "Inter-Bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  winnerScore: {
    fontSize: 24,
    fontFamily: "Inter-SemiBold",
    color: "#4CAF50",
  },
  resultsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    marginBottom: 40,
  },
  resultsTitle: {
    fontSize: 24,
    fontFamily: "Inter-SemiBold",
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  playerResult: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 5,
  },
  playerRank: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rankText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "#4CAF50",
    marginRight: 15,
    minWidth: 30,
  },
  playerName: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    color: "#ffffff",
    flex: 1,
  },
  playerScore: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#ffffff",
  },
  playAgainButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  playAgainText: {
    color: "#ffffff",
    fontFamily: "Inter-Bold",
    fontSize: 18,
  },
});
