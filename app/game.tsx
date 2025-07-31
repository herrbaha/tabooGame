import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useGameStore } from "@/store/gameStore";
import { TABOO_WORDS } from "@/constants/words";
import { useEffect, useState } from "react";

export default function Game() {
  const {
    players,
    selectedTime,
    targetScore,
    passCount,
    currentRound,
    maxRounds,
    currentPlayer,
    timeLeft,
    currentScore,
    currentWordIndex,
    updatePlayerScore,
    usePass,
    nextPlayer,
    nextRound,
    setTimeLeft,
    setCurrentScore,
    setCurrentWordIndex,
  } = useGameStore();

  const [isGameActive, setIsGameActive] = useState(false);
  const [isPreparationMode, setIsPreparationMode] = useState(true);

  // Oyun başlangıcında state'leri ayarla
  useEffect(() => {
    if (players.length > 0) {
      // İlk indeksi ayarla
      setCurrentWordIndex(0);
    }
  }, [players.length]);

  useEffect(() => {
    if (!isGameActive || isPreparationMode) return;

    if (timeLeft === 0) {
      endTurn();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isGameActive, isPreparationMode]);

  const startTurn = () => {
    setIsPreparationMode(false);
    setIsGameActive(true);
  };

  const endTurn = () => {
    setIsGameActive(false);
    setIsPreparationMode(true);

    // Mevcut oyuncunun skorunu güncelle
    updatePlayerScore(currentPlayer, currentScore);

    // Hedef skora ulaşan oyuncu var mı kontrol et
    const playerWithTargetScore = players.find(
      (player) => player.score >= targetScore
    );

    if (playerWithTargetScore) {
      // Oyun bitti
      router.push("/game-over");
      return;
    }

    // Sıradaki oyuncuya geç
    const nextPlayerIndex = (currentPlayer + 1) % players.length;

    if (nextPlayerIndex === 0) {
      // Tüm oyuncular oynadı, tur bitti
      if (currentRound < maxRounds) {
        // Yeni tur başlat
        nextRound();
        Alert.alert(
          `${currentRound}. Tur Bitti!`,
          `${currentRound + 1}. Tur başlıyor...`,
          [{ text: "Tamam", onPress: () => setIsPreparationMode(true) }]
        );
      } else {
        // Tüm turlar bitti, oyun sonu
        router.push("/game-over");
        return;
      }
    } else {
      // Sıradaki oyuncuya geç
      nextPlayer();
    }
  };

  const handleCorrect = () => {
    setCurrentScore(currentScore + 1);
    // Sonraki indekse geç
    setCurrentWordIndex((currentWordIndex + 1) % 4302);
  };

  const handlePass = () => {
    const canPass = usePass(currentPlayer);
    if (canPass) {
      // Sonraki indekse geç
      setCurrentWordIndex((currentWordIndex + 1) % 4302);
    } else {
      Alert.alert("Pas Hakkı Bitti!", "Bu tur için pas hakkınız kalmadı.", [
        { text: "Tamam" },
      ]);
    }
  };

  const handleTaboo = () => {
    setCurrentScore(currentScore - 1);
    // Sonraki indekse geç
    setCurrentWordIndex((currentWordIndex + 1) % 4302);
  };

  const currentWord = TABOO_WORDS[currentWordIndex];
  const currentPlayerData = players[currentPlayer];

  // Eğer oyuncu verisi yoksa loading göster
  if (!currentPlayerData || players.length === 0) {
    return (
      <LinearGradient
        colors={["#1a237e", "#3949ab", "#5c6bc0"]}
        style={styles.container}
      >
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Oyun Yükleniyor...</Text>
        </View>
      </LinearGradient>
    );
  }

  // Eğer currentWord undefined ise loading göster
  if (!currentWord) {
    return (
      <LinearGradient
        colors={["#1a237e", "#3949ab", "#5c6bc0"]}
        style={styles.container}
      >
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Sorular Hazırlanıyor...</Text>
        </View>
      </LinearGradient>
    );
  }

  // Hazırlık modu
  if (isPreparationMode) {
    const isFirstTurn = currentPlayer === 0 && currentScore === 0;

    return (
      <LinearGradient
        colors={["#1a237e", "#3949ab", "#5c6bc0"]}
        style={styles.container}
      >
        <View style={styles.preparationContainer}>
          <Text style={styles.preparationTitle}>Hazırlık</Text>

          <View style={styles.playerInfo}>
            <Text style={styles.playerName}>{currentPlayerData.name}</Text>
            <Text style={styles.playerTurn}>{currentPlayer + 1}. Oyuncu</Text>
            <Text style={styles.preparationText}>
              {isFirstTurn
                ? "Oyun başlıyor! Telefonu/tableti elinize alın ve hazır olduğunuzda başlayın."
                : "Sıra sizde! Telefonu/tableti elinize alın ve hazır olduğunuzda başlayın."}
            </Text>
          </View>

          <View style={styles.gameInfo}>
            <Text style={styles.infoText}>
              Tur: {currentRound}/{maxRounds}
            </Text>
            <Text style={styles.infoText}>Süre: {selectedTime} saniye</Text>
            <Text style={styles.infoText}>Hedef Skor: {targetScore}</Text>
            <Text style={styles.infoText}>Pas Hakkı: {passCount}</Text>

            <View style={styles.scoresContainer}>
              <Text style={styles.scoresTitle}>Mevcut Skorlar:</Text>
              {players.map((player, index) => (
                <Text key={index} style={styles.scoreText}>
                  {player.name}: {player.score} puan
                </Text>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.startTurnButton} onPress={startTurn}>
            <Text style={styles.startTurnButtonText}>BAŞLA</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#1a237e", "#3949ab", "#5c6bc0"]}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.timer}>{timeLeft}s</Text>
          <Text style={styles.roundText}>{currentRound}. Tur</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.score}>Skor: {currentScore}</Text>
          <Text style={styles.totalScore}>
            Toplam: {currentPlayerData.score + currentScore}
          </Text>
        </View>
      </View>

      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{currentPlayerData.name}</Text>
        <View style={styles.playerStats}>
          <Text style={styles.statText}>
            Pas: {currentPlayerData.passesUsed}/{passCount}
          </Text>
        </View>
      </View>

      <View style={styles.wordContainer}>
        <Text style={styles.mainWord}>{currentWord.word}</Text>
        <View style={styles.tabooWords}>
          {currentWord.tabooWords.map((word, index) => (
            <Text key={index} style={styles.tabooWord}>
              {word}
            </Text>
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
          style={[
            styles.button,
            styles.passButton,
            currentPlayerData.passesUsed >= passCount && styles.disabledButton,
          ]}
          onPress={handlePass}
          disabled={currentPlayerData.passesUsed >= passCount}
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

      <View style={styles.gameInfo}>
        <Text style={styles.infoText}>Hedef Skor: {targetScore}</Text>
        <Text style={styles.infoText}>
          Kalan Oyuncu: {players.length - currentPlayer - 1}
        </Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {
    alignItems: "flex-start",
  },
  headerRight: {
    alignItems: "flex-end",
  },
  timer: {
    fontSize: 32,
    fontFamily: "Inter-Bold",
    color: "#ffffff",
  },
  roundText: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#ffffff",
    marginTop: 5,
  },
  score: {
    fontSize: 24,
    fontFamily: "Inter-SemiBold",
    color: "#ffffff",
  },
  totalScore: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#ffffff",
    marginTop: 5,
  },
  playerInfo: {
    alignItems: "center",
    marginBottom: 30,
  },
  playerName: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  playerTurn: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#ffffff",
    marginBottom: 5,
  },
  playerStats: {
    flexDirection: "row",
    gap: 20,
  },
  statText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#ffffff",
  },
  wordContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 40,
  },
  mainWord: {
    fontSize: 36,
    fontFamily: "Inter-Bold",
    color: "#1a237e",
    marginBottom: 20,
  },
  tabooWords: {
    width: "100%",
  },
  tabooWord: {
    fontSize: 20,
    fontFamily: "Inter-Regular",
    color: "#e53935",
    textAlign: "center",
    marginVertical: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  tabooButton: {
    backgroundColor: "#e53935",
  },
  passButton: {
    backgroundColor: "#fb8c00",
  },
  correctButton: {
    backgroundColor: "#43a047",
  },
  disabledButton: {
    backgroundColor: "#9e9e9e",
  },
  buttonText: {
    color: "#ffffff",
    fontFamily: "Inter-Bold",
    fontSize: 18,
  },
  gameInfo: {
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#ffffff",
    marginVertical: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#ffffff",
  },
  preparationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  preparationTitle: {
    fontSize: 32,
    fontFamily: "Inter-Bold",
    color: "#ffffff",
    marginBottom: 30,
  },
  preparationText: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  startTurnButton: {
    backgroundColor: "#43a047",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginTop: 20,
  },
  startTurnButtonText: {
    color: "#ffffff",
    fontFamily: "Inter-Bold",
    fontSize: 24,
  },
  scoresContainer: {
    marginTop: 20,
    width: "100%",
  },
  scoresTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#ffffff",
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#ffffff",
    marginBottom: 5,
  },
});
