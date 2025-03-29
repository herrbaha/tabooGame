import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore } from '@/store/gameStore';
import { useState } from 'react';

const playerCounts = [2, 3, 4];
const timeOptions = [30, 60, 120, 240];
const scoreOptions = [10, 30, 50, 100];
const passOptions = [1, 3, 6, 9];

export default function GameConfig() {
  const {
    selectedPlayerCount,
    selectedTime,
    targetScore,
    passCount,
    setPlayerCount,
    setTime,
    setTargetScore,
    setPassCount,
    setPlayers,
  } = useGameStore();

  const [playerNames, setPlayerNames] = useState<string[]>(
    Array(selectedPlayerCount).fill('')
  );

  const updatePlayerName = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStartGame = () => {
    const players = playerNames.map(name => ({
      name: name.trim() || `Takım ${playerNames.indexOf(name) + 1}`,
      score: 0,
    }));
    setPlayers(players);
    router.push('/game');
  };

  return (
    <LinearGradient
      colors={['#1a237e', '#3949ab', '#5c6bc0']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Oyun Modu</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Oyuncu Sayısı</Text>
            <View style={styles.optionsGrid}>
              {playerCounts.map(count => (
                <TouchableOpacity
                  key={count}
                  style={[
                    styles.option,
                    selectedPlayerCount === count && styles.selectedOption,
                  ]}
                  onPress={() => {
                    setPlayerCount(count);
                    setPlayerNames(Array(count).fill(''));
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    selectedPlayerCount === count && styles.selectedOptionText,
                  ]}>{count} Oyuncu</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Takım İsimleri</Text>
            {playerNames.map((name, index) => (
              <TextInput
                key={index}
                style={styles.input}
                placeholder={`Takım ${index + 1}`}
                value={name}
                onChangeText={(text) => updatePlayerName(index, text)}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
              />
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Süre (Saniye)</Text>
            <View style={styles.optionsGrid}>
              {timeOptions.map(time => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.option,
                    selectedTime === time && styles.selectedOption,
                  ]}
                  onPress={() => setTime(time)}
                >
                  <Text style={[
                    styles.optionText,
                    selectedTime === time && styles.selectedOptionText,
                  ]}>{time}s</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hedef Skor</Text>
            <View style={styles.optionsGrid}>
              {scoreOptions.map(score => (
                <TouchableOpacity
                  key={score}
                  style={[
                    styles.option,
                    targetScore === score && styles.selectedOption,
                  ]}
                  onPress={() => setTargetScore(score)}
                >
                  <Text style={[
                    styles.optionText,
                    targetScore === score && styles.selectedOptionText,
                  ]}>{score} Puan</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pas Hakkı</Text>
            <View style={styles.optionsGrid}>
              {passOptions.map(pass => (
                <TouchableOpacity
                  key={pass}
                  style={[
                    styles.option,
                    passCount === pass && styles.selectedOption,
                  ]}
                  onPress={() => setPassCount(pass)}
                >
                  <Text style={[
                    styles.optionText,
                    passCount === pass && styles.selectedOptionText,
                  ]}>{pass} Pas</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartGame}
          >
            <Text style={styles.startButtonText}>Oyunu Başlat</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#ffffff',
  },
  optionText: {
    color: '#ffffff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  selectedOptionText: {
    color: '#1a237e',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    color: '#ffffff',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  startButtonText: {
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
});