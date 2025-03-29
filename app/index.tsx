import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function StartScreen() {
  const handleImagePress = () => {
    router.push('/game-config');
  };

  return (
    <LinearGradient
      colors={['#1a237e', '#3949ab', '#5c6bc0']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Taboo für Sila und Eymen</Text>
        <View style={styles.imageGrid}>
          <TouchableOpacity onPress={handleImagePress} style={styles.imageContainer}>
            <Image
              source={require('../assets/images/tabo.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  imageGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
  },
  imageText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1a237e',
    textAlign: 'center',
    padding: 12,
    backgroundColor: '#ffffff',
  },
});